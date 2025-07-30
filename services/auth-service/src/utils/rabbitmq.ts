import amqp from "amqplib";

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async (retries = 5) => {
  while (retries) {
    try {
      const connection = await amqp.connect("amqp://rabbitmq:5672");

      connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
      });

      connection.on("close", () => {
        console.warn("RabbitMQ connection closed. Attempting reconnect...");
        // You could trigger reconnect here if desired
      });

      channel = await connection.createChannel();
      await channel.assertQueue("user_created", { durable: true });

      console.log("Connected to RabbitMQ");
      return;
    } catch (error) {
      console.error("Failed to connect to RabbitMQ. Retrying...");
      retries--;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }

  throw new Error("Unable to connect to RabbitMQ after retries");
};

export const publishUserCreated = async (data: any) => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  const buffer = Buffer.from(JSON.stringify(data));
  const sent = channel.sendToQueue("user_created", buffer, {
    persistent: true, // safer for delivery
  });

  if (!sent) {
    console.warn("Message was not sent to queue");
  }
};
