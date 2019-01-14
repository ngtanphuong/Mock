using System;

namespace DataObject.Models
{
    /// <summary>
    /// this class help you transfer data actor
    /// </summary>
    public class ActorModel
    {
        #region infomation of each actor
        public int ActorID { get; set; }

        public string ActorName { get; set; }

        public bool Gender { get; set; }

        public DateTime Birthday { get; set; }

        public string Describe { get; set; }

        public string Img { get; set; }

        public bool Status { get; set; }
        #endregion
    }
}
