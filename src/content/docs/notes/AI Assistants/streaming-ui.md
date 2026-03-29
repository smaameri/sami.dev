---
title: Streaming to chats
description: Streaming Assistant Conversations to the frontend
---

The way streaming AI Assistants like ChatGPT, Claude and Gemini work is really cool.

You can refresh the page, switch between conversations, and any in progress streaming just continue working.

How do they do that?

The flow and setup looks something like this:

1. The AI Assistant, on receiving a message, starts streaming out its response in chunks.
2. The chunks are sent to a queue, for example in Redis.
3. The frontend subscribes to this queue, and receives the chunks as they come in.

And the queue name is linked to your current Conversations ID.

So whenever you load a conversation, for example in ChatGPT, it checks if there is an active stream for that
conversation, and if so, connects to and starts streaming out the results.

At a high level, that is how it works.

There are details you need to figure out. Like do you stream the entire message per chunk, or just stream out the
incremental chunks.

If you stream the whole message each time, the frontend just needs to display only the entire chunk it receives each time.
But that is does mean bigger payloads each time.

If you send only the incremental chunks, then on re-connecting to the stream, how do you know what to display? That means
you need to keep track of the whole message somewhere as well, maybe saving it to the database as it comes in, and then
on reconnecting you load the initial parts from the database, and then start adding on to that the streamed chunks.

In a recent AI Assistant I built, I am just streaming the entire message payload each time. That's simpler to handle on
the frontend. The way I am doing that is on the Claude Agent SDK, I am buffering the messages in a local queue,
and publishing to the webhook every 200ms. My backend picks up that messages, build the full message, using the saves
partial message, and the new chunk, saves the new message, and streams the result to a channel the frontend is listening
to.

200ms gives a decent visual effect on the frontend for streaming, and prevents me smashing my database with saves per
actual streamed chunk that comes out of the agent sdk. I am SURE there are better ways. My current application usage is
not too heavy though, and whatever way you choose a lot of the important concepts will be similar, so hopefully sharing
my implementation helps you on yours as well.

Also talk about different queuiing technologies like SSE, Redis, Websockets e.t.c






