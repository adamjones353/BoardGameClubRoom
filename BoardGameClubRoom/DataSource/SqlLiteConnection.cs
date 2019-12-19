using System.Data.SQLite;

namespace BoardGameClubRoom.DataSource
{
    public class SqlLiteConnection: IDataConnection
    {
        private SQLiteConnection _connection;

        public SQLiteConnection CreateConnection()
        {
            _connection = new SQLiteConnection("Data Source=Games.sqlite;Version=3;New=False;Compress=True;");
            _connection.Open();
            return _connection;
        }

        public void CloseConnection()
        {
            _connection.Close();
        }

    }
}