using System;
using System.Collections.Generic;

namespace BoardGameClubRoom.Models
{
   public class ChatMessage{
       public string Message { get; set; }

       public DateTime TimeStamp { get; set; }

       public string Sender { get; set; }
   }

   public class ChatLog
   {
       public List<ChatMessage> Messages;
   }
}