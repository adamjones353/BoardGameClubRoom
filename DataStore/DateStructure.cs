using System;
using System.Collections.Generic;

namespace DataStore
{
    public class Tables
    {
        private List<Table> tables;
        
        public Tables()
        {
            tables = new List<Table>();
        }

        public List<Table> GetAllTables => tables;

        public Table GetTable(string name)
        {
            return tables.Find(x => x.Name == name);
        }

        public void CreateTable(string name)
        {
            tables.Add(new Table(name));
        }

        public bool DropTable(string name)
        {
            return tables.Remove(tables.Find(x => x.Name == name));
        }
    }


    public class Table
    {
        public string Name { get; set; }
        private List<object> Rows;

        public Table(string name)
        {
            Name = name;
            Rows = new List<object>();
        }

    }
}
