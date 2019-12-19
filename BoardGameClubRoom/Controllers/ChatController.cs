using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BoardGameClubRoom.Models;
using System.Data.SQLite;
using BoardGameClubRoom.DataSource;

namespace BoardGameClubRoom.Controllers
{
    public class ChatController : Controller
    {
        private IDataConnection _connection;

        public ChatController(IDataConnection connection)
        {
            _connection = connection;
        }


        [HttpPost]
        public void SendMessage(ChatMessage chatMessage)
        {
            using (SQLiteConnection conn = _connection.CreateConnection())
            using (var mycommand = new SQLiteCommand(conn))
            {
                mycommand.CommandText = "INSERT INTO [Messages] ([Message], [Created_DateTime], [User_Key]) VALUES (@message, @datetime, @user); ";
                mycommand.Parameters.AddWithValue("@message", chatMessage.Message);
                mycommand.Parameters.AddWithValue("@datetime", chatMessage.TimeStamp);
                mycommand.Parameters.AddWithValue("@user", chatMessage.Sender);
                mycommand.ExecuteNonQuery();
            }

            _connection.CloseConnection();
        }


        public string GetMessages()
        {
            //            using (var connection = new SQLiteConnection("Data Source=Games.sqlite"))
            //            {
            //                connection.Open();
            //                using (SQLiteCommand command = connection.CreateCommand())
            //                {
            //                    command.CommandText = @"SELECT * FROM Messages";
            //                    SQLiteDataReader r = command.ExecuteReader();
            //                    while (r.Read())
            //                    {
            //                        string FileNames = (string)r["Message"];
            //
            //                        List<string> ImportedFiles = new List<string>();
            //
            //                    }
            //
            //                    connection.Close();
            //                }
            //                cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Audi',52642)";
            //                  cmd.ExecuteNonQuery();
            //            }


            DataTable data = new DataTable();

            using (SQLiteConnection conn = new SQLiteConnection("Data Source=Games.sqlite;Version=3;New=False;Compress=True;"))
            using (SQLiteCommand mycommand = new SQLiteCommand(conn))
            {
                mycommand.CommandText = "SELECT * FROM Messages;";
                //mycommand.Parameters.AddWithValue("@tag", tag);
                conn.Open();

                using (SQLiteDataReader reader = mycommand.ExecuteReader())
                {
                    data.Load(reader);
                    while (reader.Read())
                    {
                        var temp = $"{reader.GetInt32(0)} {reader.GetString(1)}";
                    }
                }
                conn.Close();
            }

            return "";
        }
    }
}
