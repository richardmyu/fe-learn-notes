# http

### 1.简单讲解一下 http2 的多路复用

http/1.0：该版本主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。为了解决这个问题，需要使用 Connection: keep-alive 这个字段。并且浏览器对于单域名请求有数量限制（一般6个），其连接无法被复用。

http/1.1：该版本引入了持久连接（persistent connection），即 TCP 连接默认不关闭，可以被多个请求复用，不用声明 Connection: keep-alive。还引入了管道机制（pipelining），即在同一个TCP连接里面，客户端可以同时发送多个请求。这样就进一步改进了HTTP协议的效率。但先天 FIFO（先进先出）机制导致当前请求的执行依赖于上一个请求执行的完成，容易引起报头阻塞，并没有从根本上解决问题。

> 虽然1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为"**队头堵塞**"（Head-of-line blocking）。

http/2：重新定义底层 http 语义映射，允许同一个连接上使用请求和响应双向数据流。同一域名只需占用一个 TCP 连接，通过数据流（Stream）以帧为基本协议单位，从根本上解决了问题，避免了因频繁创建连接产生的延迟，减少了内存消耗，提升了使用性能

http/2的传输是基于二进制帧的。每一个TCP连接中承载了多个双向流通的流，每一个流都有一个独一无二的标识和优先级，而流就是由二进制帧组成的。二进制帧的头部信息会标识自己属于哪一个流，所以这些帧是可以交错传输，然后在接收端通过帧头的信息组装成完整的数据。这样就解决了线头阻塞的问题，同时也提高了网络速度的利用率。

> 资料：《koa 与 nodejs 开发实战》 http 篇

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

- 第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
- 第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

> [简单讲解一下 http2 的多路复用](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14)

### 2.谈谈你对 TCP 三次握手和四次挥手的理解

一、三次握手讲解

客户端发送 位码 为 `syn＝1`,随机产生 `seq number=1234567` 的数据包到服务器，服务器由 `SYN=1` 知道客户端要求建立联机（客户端：我要连接你）

服务器收到请求后要确认联机信息，向客户端发送 `ack number=(客户端的 seq+1),syn=1,ack=1`,随机产生 `seq=7654321` 的包（服务器：好的，你来连吧）

客户端收到后检查 `ack number` 是否正确，即第一次发送的 `seq number+1`,以及位码ack是否为1，若正确，客户端会再发送ack number=(服务器的seq+1),ack=1，服务器收到后确认seq值与ack=1则连接建立成功。（客户端：好的，我来了）

二、为什么 http 建立连接需要三次握手，不是两次或四次?

答：三次是最少的安全次数，两次不安全，四次浪费资源；

三、TCP 关闭连接过程

Client 向 Server 发送 FIN 包，表示 Client 主动要关闭连接，然后进入 FIN_WAIT_1 状态，等待 Server 返回 ACK 包。此后 Client 不能再向 Server 发送数据，但能读取数据。

Server 收到 FIN 包后向 Client 发送 ACK 包，然后进入 CLOSE_WAIT 状态，此后 Server 不能再读取数据，但可以继续向 Client 发送数据。

Client 收到 Server 返回的 ACK 包后进入 FIN_WAIT_2 状态，等待 Server 发送 FIN 包。

Server 完成数据的发送后，将 FIN 包发送给 Client，然后进入 LAST_ACK 状态，等待 Client 返回 ACK 包，此后 Server 既不能读取数据，也不能发送数据。

Client 收到 FIN 包后向 Server 发送 ACK 包，然后进入 TIME_WAIT 状态，接着等待足够长的时间（2MSL）以确保 Server 接收到 ACK 包，最后回到 CLOSED 状态，释放网络资源。

Server 收到 Client 返回的 ACK 包后便回到 CLOSED 状态，释放网络资源。

![四次挥手](https://user-gold-cdn.xitu.io/2018/12/5/1677d4e9d7301954?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

四、为什么要四次挥手？

TCP 是全双工信道，何为全双工就是客户端与服务端建立两条通道，通道1:客户端的输出连接服务端的输入；通道2:客户端的输入连接服务端的输出。两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。所以关闭双通道的时候就是这样：

客户端：我要关闭输入通道了。
服务端：好的，你关闭吧，我这边也关闭这个通道。

服务端：我也要关闭输入通道了。
客户端：好的你关闭吧，我也把这个通道关闭。

> [谈谈你对 TCP 三次握手和四次挥手的理解](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)

### 3.A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

...

> [A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/21)

### 4.介绍 HTTPS 握手过程

> [介绍 HTTPS 握手过程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/70)

### 5.HTTPS 握手过程中，客户端如何验证证书的合法性

> [HTTPS 握手过程中，客户端如何验证证书的合法性](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74)

### 6.第 91 题：介绍下 HTTPS 中间人攻击 #142

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142)
