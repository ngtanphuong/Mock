using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Net;
using DataAccess.Login;

namespace APIAplication.Models
{
    public class BasicAuthentication : AuthorizationFilterAttribute
    {

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.
                    CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string encodeToken = actionContext.Request.Headers.Authorization.Parameter;

                LoginServices loginServices = new LoginServices();
                int checkLogin = loginServices.CheckToken(encodeToken);

                if (checkLogin == 1)
                {

                }
                else
                {
                    actionContext.Response = actionContext.Request
                        .CreateResponse(HttpStatusCode.Unauthorized);
                }
            }

            //BadRequest = 400
            //Unauthorized = 401
            //PaymentRequired = 402
            //Forbidden = 403
            //NotFound = 404
        }
    }
}