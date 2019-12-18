using System;
using System.Collections.Generic;

namespace DataStore
{
    public class StateStorage
    {
        private static Tables tables;

        public StateStorage()
        {
            if (tables == null)
            {
                tables = new Tables();
            }
        }

        public void Insert()

    }
}
