import amqp from "amqplib";

export const startConsumer = async (retries = 5) => {
  while (retries) {
    try {
      const connection = await amqp.connect("amqp://rabbitmq:5672");
      const channel = await connection.createChannel();
      await channel.assertQueue("user_created");

      channel.consume("user_created", (msg) => {
        if (msg) {
          const user = JSON.parse(msg.content.toString());
          console.log("User created notification received", user);
          channel.ack(msg);
        }
      });
      return;
    } catch (error) {
      console.log("Retrying to connect to rabbitmq consumer");
      retries--;
      await new Promise((res) => setTimeout(res, 2000));
    }
  }
  throw new Error("Unable to connect to rabbitmq consumer");
};
