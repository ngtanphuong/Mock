using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataObject.Models
{
    /// <summary>
    /// this class help you transfer data Director
    /// </summary>
    public class DirectorModel
    {
        #region infomation of director

        public int DirectorID { get; set; }
        
        public string DirectorName { get; set; }
        
        public bool DirectorGender { get; set; }
        
        public DateTime DirectorBirthday { get; set; }
        
        public string DirectorDescribe { get; set; }
        
        public string DirectorImg { get; set; }
        
        public bool DirectorStatus { get; set; }
        #endregion
    }
}
