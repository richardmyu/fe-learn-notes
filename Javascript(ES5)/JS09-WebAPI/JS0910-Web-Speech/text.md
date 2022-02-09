# Web Speech

## 1.概述

这个 API 用于浏览器接收语音输入。

它最早是由 Google 提出的，目的是让用户直接进行语音搜索，即对着麦克风说出你所要搜索的词，搜索结果就自动出现。Google 首先部署的是 `input` 元素的 `speech` 属性（加上浏览器前缀 `x-webkit`）。

`<input id="query" type="search" class="k-input k-textbox" x-webkit-speech speech />`

加上这个属性以后，输入框的右端会出现了一个麦克风标志，点击该标志，就会跳出语音输入窗口。

由于这个操作过于简单，Google 又在它的基础上提出了 Web Speech API，使得 JavaScript 可以操作语音输入。

目前，只有 Chrome 浏览器支持该 API。

## 2.`SpeechRecognition` 对象

这个 API 部署在 SpeechRecognition 对象之上。

```javascript
var SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.oSpeechRecognition ||
  window.msSpeechRecognition;
```

为了将来的兼容性考虑，上面的代码列出了所有浏览器的前缀。但是实际上，目前只有 `window.webkitSpeechRecognition` 是可用的。

确定浏览器支持以后，新建一个 SpeechRecognition 的实例对象。

```javascript
if (SpeechRecognition) {
  var recognition = new SpeechRecognition();
  recognition.maxAlternatives = 5;
}
```

`maxAlternatives` 属性等于 5，表示最多返回 5 个语音匹配结果。

## 3.事件

目前，该 API 部署了 11 个事件。下面对其中的 3 个定义回调函数（假定 speak 是语音输入框）。

```javascript
var speak = \$('#speak');

recognition.onaudiostart = function() {
speak.val("Speak now...");
};

recognition.onnomatch = function() {
speak.val("Try again please...");
};

recognition.onerror = function() {
speak.val("Error. Try Again...");
};
```

首先，浏览器会询问用户是否许可浏览器获取麦克风数据。如果用户许可，就会触发 `audiostart` 事件，准备接收语音输入。如果找不到与语音匹配的值，就会触发 `nomatch` 事件；如果发生错误，则会触发 `error` 事件。

如果得到与语音匹配的值，则会触发 `result` 事件。

```javascript
recognition.onresult = function(event) {
  if (event.results.length > 0) {
    var results = event.results[0],
      topResult = results[0];

    if (topResult.confidence > 0.5) {
      speechSearch(results, topResult);
    } else {
      speak.val("Try again please...");
    }
  }
};
```

`result` 事件回调函数的参数，是一个 SpeechRecognitionEvent 对象。它的 `results` 属性就是语音匹配的结果，是一个数组，按照匹配度排序，最匹配的结果排在第一位。该数组的每一个成员是 SpeechRecognitionResult 对象，该对象的 `transcript` 属性是实际匹配的文本，`confidence` 属性是可信度（在 0 与 1 之间）。
