# Bézier curve

贝塞尔曲线是一种使用数学方法描述的曲线，被广泛用于计算机图形学和动画中。

贝塞尔曲线由至少两个控制点进行描述。Web 技术中使用的是三次贝塞尔曲线，即使用四个控制点 `[P0, P1, P2, P3]` 描述的曲线。

## 线性贝塞尔曲线

给定点 `P0`、`P1`，线性贝塞尔曲线只是一条两点之间的直线。这条线由下式给出：

<img src="https://latex.codecogs.com/svg.image?B\left&space;(&space;t&space;\right&space;)=P_{0}&plus;(P_{1}-P_{0})t=(1-t)P_{0}&plus;tP_{1},&space;t\in&space;\left&space;[&space;0,&space;1&space;\right&space;]" title="B\left ( t \right )=P_{0}+(P_{1}-P_{0})t=(1-t)P_{0}+tP_{1}, t\in \left [ 0, 1 \right ]" />

且其等同于线性插值。

![https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/0/00/B%C3%A9zier_1_big.gif/240px-B%C3%A9zier_1_big.gif](https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/0/00/B%C3%A9zier_1_big.gif/240px-B%C3%A9zier_1_big.gif)

## 二次方贝塞尔曲线

二次方贝塞尔曲线的路径由给定点 `P0`、`P1`、`P2` 的函数 `B(t)` 追踪：

<img src="https://latex.codecogs.com/svg.image?B(t)=(1-t)^{2}P_{0}&plus;2(1-t)tP_{1}&plus;t^{2}P_{2},&space;t\in&space;\left&space;[&space;0,&space;1&space;\right&space;]" title="B(t)=(1-t)^{2}P_{0}+2(1-t)tP_{1}+t^{2}P_{2}, t\in \left [ 0, 1 \right ]" />

![https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/6/6b/B%C3%A9zier_2_big.svg/240px-B%C3%A9zier_2_big.svg.png](https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/6/6b/B%C3%A9zier_2_big.svg/240px-B%C3%A9zier_2_big.svg.png)

## 三次方贝塞尔曲线

`P0`、`P1`、`P2`、`P3` 四个点在平面或在三维空间中定义了三次方贝塞尔曲线。曲线起始于 `P0` 走向 `P1`，并从 `P2` 的方向来到 `P3`。一般不会经过 `P1` 或 `P2`；这两个点只是在那里提供方向信息。`P0` 和 `P1` 之间的间距，决定了曲线在转而趋进 `P2` 之前，走向 `P1` 方向的“长度有多长”。

曲线的参数形式为：

<img src="https://latex.codecogs.com/svg.image?B(t)=(1-t)^{3}P_{0}&plus;3(1-t)^{2}tP_{1}&plus;3(1-t)t^{2}P_{2}&plus;P_{3}t^{3},&space;t\in&space;\left&space;[&space;0,&space;1&space;\right&space;]" title="B(t)=(1-t)^{3}P_{0}+3(1-t)t^{2}P_{1}+3(1-t)t^{2}P_{2}+P_{3}t^{3}, t\in \left [ 0, 1 \right ]" />

![https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/8/89/B%C3%A9zier_3_big.svg/240px-B%C3%A9zier_3_big.svg.png](https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/8/89/B%C3%A9zier_3_big.svg/240px-B%C3%A9zier_3_big.svg.png)

---

参考：

1.[贝塞尔曲线](https://www.wanweibaike.com/wiki-%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)

2.[Bézier curve](https://en.wanweibaike.com/wiki-B%C3%A9zier%20Curve)
