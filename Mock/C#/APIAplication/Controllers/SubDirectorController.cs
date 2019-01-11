using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIAplication.Controllers
{
    public class SubDirectorController : ApiController
    {
        // GET: api/SubDirector
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SubDirector/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SubDirector
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SubDirector/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SubDirector/5
        public void Delete(int id)
        {
        }
    }
}
