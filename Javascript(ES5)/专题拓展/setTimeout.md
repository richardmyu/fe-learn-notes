# `setTimeout`

## 1.`setTimeout` 最小延迟时间

---

1.[为什么 setTimeout 有最小时延 4ms ?](https://zhuanlan.zhihu.com/p/155752686)

2.[HTML Living Standard 8.6 Timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timershttps://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)

3.[Javascript Timers 时钟](https://segmentfault.com/a/1190000011361510)

---

### 1.1.`timeout` 小于 0 会被设置成 0

```js
// Google Chrome 91.0.4472.114（正式版本） （64 位）
setTimeout(()=>console.log(-9),-9);
setTimeout(()=>console.log(0),0)
// -9 0

setTimeout(()=>console.log(0),0);
setTimeout(()=>console.log(-9),-9);
// 0 -9
```

### 1.2.`timeout` 为 0 不一定是最先执行的

```js
// Google Chrome 91.0.4472.114（正式版本） （64 位）
setTimeout(()=>console.log(5),5)
setTimeout(()=>console.log(4),4)
setTimeout(()=>console.log(3),3)
setTimeout(()=>console.log(2),2)
setTimeout(()=>console.log(1),1)
setTimeout(()=>console.log(0),0)

// 大概率（40，80%）： 1 0 2 3 4 5
// 有概率（10，20%）： 1 2 0 3 4 5
```

而在 Firefox 中，始终是 `0,1,2,3,4,5` 输出。

### 1.3.4ms 延迟

> [8.6 Timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)
> 10. If timeout is less than 0, then set timeout to 0.
> 11. If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.

按照规范所说，出现最小 4 ms 延迟的前提是要超过 5 层的嵌套。

```js
// Google Chrome 91.0.4472.114（正式版本） （64 位）
console.log(+new Date());

setTimeout(() => {
  console.log(55, +new Date())
  setTimeout(() => {
    console.log(44, +new Date())
    setTimeout(() => {
      console.log(33, +new Date())
      setTimeout(() => {
        console.log(22, +new Date())
        setTimeout(() => {
          console.log(11, +new Date())
        }, 1);
      }, 2);
    }, 3);
  }, 4);
}, 5);

// 其他位毫秒数相差不大，唯有第 5 层的实际时间差值比较大，基本大于 4
// 1625357047074
// 55 1625357047081
// 44 1625357047087
// 33 1625357047091
// 22 1625357047095
// 11 1625357047100
```

5 层嵌套（第 5 层）实测数据：

| 实际延迟 | 频数 (5) | 频率 (5) |
| :------: | :------: | :------: |
|    4     |    4     |    8%    |
|    5     |    33    |   66%    |
|    6     |    13    |   26%    |

6 层嵌套（第 5、6 层）实测数据：

| 实际延迟 | 频数（5/6） | 频率（5/6） |
| :------: | :---------: | :---------: |
|    4     |     6/4     |   12%/8%    |
|    5     |    32/41    |   64%/82%   |
|    6     |     9/5     |   18%/10%   |
|    7     |     3/0     |    6%/0%    |

综上，虽然规范说是超过 5 层，但实测（Chrome）中到达 5 层嵌套，就会出现 4 ms 限制。

> 在 Firefox 中，时间差大概率会到达 15 ms 以上。（主测是 chrome，Firefox 辅助，所以没有翔实的数据）

### 1.4.chrome 实现

上述文章提到的源码连接，没有找到（其实是访问不到：clown_face:，能访问的 [timer](https://github.com/chromium/chromium/tree/master/base/timer)，又看不懂 c++ :angry::angry: ）

后来切换版本（53.0.2772.0，估计上下浮动几个版本，应该还能看到吧），终于找到了 [DOMTimer.cpp](https://github.com/chromium/chromium/blob/53.0.2772.0/third_party/WebKit/Source/core/frame/DOMTimer.cpp)

```c++
// 53.0.2772.0
// https://github.com/chromium/chromium/blob/53.0.2772.0/third_party/WebKit/Source/core/frame/DOMTimer.cpp

static const int maxIntervalForUserGestureForwarding = 1000; // One second matches Gecko.
static const int maxTimerNestingLevel = 5;
static const double oneMillisecond = 0.001;
// Chromium uses a minimum timer interval of 4ms. We'd like to go
// lower; however, there are poorly coded websites out there which do
// create CPU-spinning loops.  Using 4ms prevents the CPU from
// spinning too busily and provides a balance between CPU spinning and
// the smallest possible interval timer.
static const double minimumInterval = 0.004;

 double intervalMilliseconds = std::max(oneMillisecond, interval * oneMillisecond);
    if (intervalMilliseconds < minimumInterval && m_nestingLevel >= maxTimerNestingLevel)
        intervalMilliseconds = minimumInterval;
    if (singleShot)
        startOneShot(intervalMilliseconds, BLINK_FROM_HERE);
    else
        startRepeating(intervalMilliseconds, BLINK_FROM_HERE);
```

另一个版本：

```c++
// 66.0.3329.3
// https://github.com/chromium/chromium/blob/66.0.3329.3/third_party/WebKit/Source/core/frame/DOMTimer.cpp

static const TimeDelta kMaxIntervalForUserGestureForwarding =
    TimeDelta::FromMilliseconds(1000);  // One second matches Gecko.
static const int kMaxTimerNestingLevel = 5;
// Chromium uses a minimum timer interval of 4ms. We'd like to go
// lower; however, there are poorly coded websites out there which do
// create CPU-spinning loops.  Using 4ms prevents the CPU from
// spinning too busily and provides a balance between CPU spinning and
// the smallest possible interval timer.
static constexpr TimeDelta kMinimumInterval = TimeDelta::FromMilliseconds(4);

TimeDelta interval_milliseconds =
      std::max(TimeDelta::FromMilliseconds(1), interval);
  if (interval_milliseconds < kMinimumInterval &&
      nesting_level_ >= kMaxTimerNestingLevel)
    interval_milliseconds = kMinimumInterval;
  if (single_shot)
    StartOneShot(interval_milliseconds, FROM_HERE);
  else
    StartRepeating(interval_milliseconds, FROM_HERE);
```

1. 由 `intervalMilliseconds = std::max(oneMillisecond, interval * oneMillisecond);` 可知，chrome 默认最小延迟时间是 1 ms；
2. `m_nestingLevel >= maxTimerNestingLevel` 也证实了实际在第 5 层，就有了 4 ms 限制；

### 1.5.windows 时间精确度与 15.6s

---

[Windows 系统时钟间隔](http://yiiyee.cn/blog/2013/09/01/clock-interval/)
[Why are .NET timers limited to 15 ms resolution?](https://stackoverflow.com/questions/3744032/why-are-net-timers-limited-to-15-ms-resolution)

---

在 Windows 平台，系统时钟并非精确到毫秒级，系统默认的时钟间隔是 15.6 ms。

> 如果检测到支持高精度时钟，chromium 会选择 `QueryPerformanceCounter`（QPC，微秒级），否则使用 `TimeGetTime`（精度与机器相关，默认大概 15.6 ms），chromium 在默认情况下会设置成 4 ms，但如果使用电池，会重置成默认精度。`setTimtout` 和 `setInterval` 等 Javascript 时钟函数， `DOMTimer.cpp` 里面已经写死了最小值就是 4 ms，所以 4 ms - 15.6 ms 成了这两个函数的精度。<sub>[3]</sub>

```c++
// https://github.com/chromium/chromium/blob/53.0.2772.0/base/time/time_win.cc
// https://github.com/chromium/chromium/blob/master/base/time/time_win.cc

Windows Timer Primer

A good article:  http://www.ddj.com/windows/184416651
A good mozilla bug:  http://bugzilla.mozilla.org/show_bug.cgi?id=363258

The default windows timer, GetSystemTimeAsFileTime is not very precise.
It is only good to ~15.5ms.

QueryPerformanceCounter is the logical choice for a high-precision timer.
However, it is known to be buggy on some hardware.  Specifically, it can
sometimes "jump".  On laptops, QPC can also be very expensive to call.
It's 3-4x slower than timeGetTime() on desktops, but can be 10x slower
on laptops.  A unittest exists which will show the relative cost of various
timers on any system.

The next logical choice is timeGetTime().  timeGetTime has a precision of
1ms, but only if you call APIs (timeBeginPeriod()) which affect all other
applications on the system.  By default, precision is only 15.5ms.
Unfortunately, we don't want to call timeBeginPeriod because we don't
want to affect other applications.  Further, on mobile platforms, use of
faster multimedia timers can hurt battery life.  See the intel
article about this here:
http://softwarecommunity.intel.com/articles/eng/1086.htm

To work around all this, we're going to generally use timeGetTime().  We
will only increase the system-wide timer if we're not running on battery
power.

Discussion of tick counter options on Windows:

(1) CPU cycle counter. (Retrieved via RDTSC)
The CPU counter provides the highest resolution time stamp and is the least
expensive to retrieve. However, on older CPUs, two issues can affect its
reliability: First it is maintained per processor and not synchronized
between processors. Also, the counters will change frequency due to thermal
and power changes, and stop in some states.

(2) QueryPerformanceCounter (QPC). The QPC counter provides a high-
resolution (<1 microsecond) time stamp. On most hardware running today, it
auto-detects and uses the constant-rate RDTSC counter to provide extremely
efficient and reliable time stamps.

On older CPUs where RDTSC is unreliable, it falls back to using more
expensive (20X to 40X more costly) alternate clocks, such as HPET or the ACPI
PM timer, and can involve system calls; and all this is up to the HAL (with
some help from ACPI). According to
http://blogs.msdn.com/oldnewthing/archive/2005/09/02/459952.aspx, in the
worst case, it gets the counter from the rollover interrupt on the
programmable interrupt timer. In best cases, the HAL may conclude that the
RDTSC counter runs at a constant frequency, then it uses that instead. On
multiprocessor machines, it will try to verify the values returned from
RDTSC on each processor are consistent with each other, and apply a handful
of workarounds for known buggy hardware. In other words, QPC is supposed to
give consistent results on a multiprocessor computer, but for older CPUs it
can be unreliable due bugs in BIOS or HAL.

(3) System time. The system time provides a low-resolution (from ~1 to ~15.6
milliseconds) time stamp but is comparatively less expensive to retrieve and
more reliable. Time::EnableHighResolutionTimer() and
Time::ActivateHighResolutionTimer() can be called to alter the resolution of
this timer; and also other Windows applications can alter it, affecting this
one.
```

### 1.6.5.0 ms

既然追求低延迟，为什么不直接设置为 0 ms 呢？

> 1. 其原因在于如果浏览器允许 0ms，会导致 JavaScript 引擎过度循环，也就是说如果浏览器架构是单进程的，那么可能网站很容易无响应。因为浏览器本身也是建立在 event loop 之上的，如果速度很慢的 JavaScript engine 通过 0ms timer 不断安排唤醒系统，那么 event loop 就会被阻塞。那么此时用户会面对什么情况呢？同时遇到 CPU spinning 和基本挂起的浏览器，想想就让人崩溃。<sub>[1]</sub>
>
> 2. 另外一个就是英特尔团队发现的 chrome 不正常的电量消耗。其发现 timer 导致 CPU spining，而 CPU spinning 的后果是计算机没有办法进入睡眠模式（低功耗模式），也就是耗电非常的快。因此，chrome 团队不得不解决现实问题。当时 chrome 团队的方案是对 timer 设置了很多的限制。后来，经过 chrome 团队的一些实验，发现将 1ms 提升到 4ms，在大部分机器上好像没有了 CPU spinning 和过于耗电的问题。在这种 tradeoff 的情况下达到了 chrome 团队的目标，更加精确的计时器，并且也没有产生更多的问题。<sub>[1]</sub>

---

> Some applications purposely change the platform timer resolution to 1ms to ensure smoothness of operation. This will cause the system to wake up more often, thus consuming more power. [4.1 Platform Timer Resolution](https://software.intel.com/content/www/us/en/develop/articles/power-analysis-guide-for-windows.html#_Toc343774430)
> 一些应用故意将平台定时器分辨率改为 1ms，以保证操作的流畅性。 这将导致系统更频繁地唤醒，从而消耗更多电量。
