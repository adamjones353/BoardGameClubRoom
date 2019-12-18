using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BoardGameClubRoom.Models;
using System.Data.SQLite;

namespace BoardGameClubRoom.Controllers
{
    public class ChatController : Controller
    {
        [HttpPost]
        public void SendMessage(ChatMessage message)
        {
            SQLiteConnection.CreateFile("Games.sqlite");
        }


        private void StoreMessage(ChatMessage message)
        {
            string cs = "Data Source=:memory:";
            string stm = "SELECT SQLITE_VERSION()";

            using (var con = new SQLiteConnection(cs))
            {
                con.Open();
                using (var cmd = new SQLiteCommand(stm, con))
                {
                    string version = cmd.ExecuteScalar().ToString();

                    Console.WriteLine($"SQLite version: {version}");
                }

            }
        }
    }
}
