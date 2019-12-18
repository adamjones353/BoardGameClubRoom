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
        //[HttpPost]
        public string SendMessage(ChatMessage message)
        {
            using (var connection = new SQLiteConnection("Data Source=Games.sqlite"))
            {
                connection.Open();
                using (SQLiteCommand command = connection.CreateCommand())
                {
                    SQLiteCommand sqlComm = new SQLiteCommand(@"SELECT * FROM Messages");
                    SQLiteDataReader r = sqlComm.ExecuteReader();
                    while (r.Read())
                    {
                        string FileNames = (string)r["FileName"];

                        List<string> ImportedFiles = new List<string>();

                    }

                    connection.Close();
                }
                
            }
            return "";
        }
    }
}
