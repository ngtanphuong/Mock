using System.Collections.Generic;

namespace DataAccess.Login
{
    public interface ILoginServices
    {
        // PhatLA login
        int CheckUserLogin(string userName, string password);

        int CreateToken(string userName, string password);
    }
}
