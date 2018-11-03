using System;
using System.Threading;
using Telegram.Bot;
using Telegram.Bot.Args;

namespace TelegramBot1
{
    class Program
    {
        static ITelegramBotClient botClient;

        static void Main() {
            string botId = Environment.GetEnvironmentVariable("BOT_ID");
            if (String.IsNullOrEmpty(botId)) {
                Console.WriteLine("Need BOT_ID with bot id");
            }
            botClient = new TelegramBotClient(botId);

            var me = botClient.GetMeAsync().Result;
            Console.WriteLine(
                $"Hello, World! I am user {me.Id} and my name is {me.FirstName}."
            );

            botClient.OnMessage += Bot_OnMessage;
            botClient.StartReceiving();
            System.Console.ReadLine();
        }

        static async void Bot_OnMessage(object sender, MessageEventArgs e) {
            if (e.Message.Text != null)
            {
                Console.WriteLine($"Received a text message in chat {e.Message.Chat.Id}.");

                await botClient.SendTextMessageAsync(
                    chatId: e.Message.Chat,
                    text:   "You said:\n" + e.Message.Text
                );
            }
        }
    }
}
