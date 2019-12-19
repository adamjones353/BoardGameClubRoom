using System.Data.SQLite;

namespace BoardGameClubRoom.DataSource
{
    public interface IDataConnection
    {
        SQLiteConnection CreateConnection();
        
        void CloseConnection();
    }
}