using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Services;
using System.Net.Http;
using Newtonsoft.Json;
using RestSharp;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiServiceController : ControllerBase
    {
        private readonly IApiService _eventService;

        public ApiServiceController(IApiService eventService)
        {
           _eventService = eventService;
        }

        [HttpGet]
        public ActionResult<List<ChatDetails>> Get() =>
         Ok(_eventService.Get());

        string query = "repo";
        string name__ = "MyHackathonProj";
        [HttpGet("{Uname}", Name = "GetEventsByApi")]
        public ActionResult<string> Get(string Uname)
        {
             return "Okay";

        }
        [EnableCors("AllowAllHeaders")]
        [HttpPost("{Uname}", Name = "GetEventsByApi")]

        public ActionResult<string> Create(ChatDetails Uname)
        {
            _eventService.Create(Uname);

            //var userdetail = _eventService.GetByName(Uname);
            Console.WriteLine(Uname.Message);
            var messageStr = Uname.Message;
            string[] words = messageStr.Split(" ");
            string issue = null;
            string repoName = null;
            string uname = null;
            foreach (string word in words)
            {
                if (word.Contains("_repo"))
                {
                    repoName = word.Substring(0, word.Length - 5);
                    Console.WriteLine(repoName);

                }
                if (word.Contains("_issue"))
                {
                    issue = word.Substring(0, word.Length - 6);
                    Console.WriteLine(issue);
                }
                if (word.Contains("_uname"))
                {
                    uname = word.Substring(0, word.Length - 6);
                    Console.WriteLine(uname);
                }
            }


            string url = "https://api.wit.ai/message?q="+ messageStr; // sample url
            string a = "Bearer " + "UKIVKGFEGVMQPK7PD7ZX64AHJRX266LB";
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", a);
                var b = client.GetStringAsync(url).Result;
                dynamic json = JsonConvert.DeserializeObject(b);
                var str = JsonConvert.SerializeObject(json.entities);
                var p = str.Split(new string[] { "\"" }, StringSplitOptions.None);
                foreach (string i in p)
                {
                    Console.WriteLine(i);

                }
                //Console.WriteLine(p[1]);
                if (p.Length<=1)
                {
                    return "Noooooooo";
                }
                else
                {
                    switch (p[1])
                    {
                        case "create_repo":

                            var client_ = new RestClient("https://api.github.com/user/repos");
                            var request = new RestRequest(Method.POST);
                            request.AddHeader("cache-control", "no-cache");
                            request.AddHeader("Connection", "keep-alive");
                            request.AddHeader("Accept-Encoding", "gzip, deflate");
                            request.AddHeader("Host", "api.github.com");
                            request.AddHeader("Postman-Token", "d3056e59-d436-44b2-b04b-1bc8105d3cf2,8c6331ee-79d0-419d-a960-e69fcfe0814a");
                            request.AddHeader("Cache-Control", "no-cache");
                            request.AddHeader("Accept", "/application/vnd.github.shadow-cat-preview+json");
                            request.AddHeader("User-Agent", "PostmanRuntime/7.17.1");
                            request.AddHeader("Authorization", "Bearer d66d3a2996dae3b8230e2fe8a5ce10e0605756a8");
                            request.AddJsonBody(new { name = repoName });
                            IRestResponse response = client_.Execute(request);
                            return response.Content;
                            break;

                        case "create_issue":
                            Console.WriteLine("from Issue ");
                            var clientss = new RestClient("https://api.github.com/repos/" + uname + "/" + repoName + "/issues");
                            var requestss = new RestRequest(Method.POST);
                            requestss.AddHeader("cache-control", "no-cache");
                            requestss.AddHeader("Connection", "keep-alive");
                            requestss.AddHeader("Accept-Encoding", "gzip, deflate");
                            requestss.AddHeader("Host", "api.github.com");
                            requestss.AddHeader("Postman-Token", "d3056e59-d436-44b2-b04b-1bc8105d3cf2,8c6331ee-79d0-419d-a960-e69fcfe0814a");
                            requestss.AddHeader("Cache-Control", "no-cache");
                            requestss.AddHeader("Accept", "/application/vnd.github.shadow-cat-preview+json");
                            requestss.AddHeader("User-Agent", "PostmanRuntime/7.17.1");
                            requestss.AddHeader("Authorization", "Bearer d66d3a2996dae3b8230e2fe8a5ce10e0605756a8");
                            //requestss.AddJsonBody(new { name = "BotExample" });
                            requestss.AddJsonBody(new { title = issue }); //for issue it is required.

                            IRestResponse responsess = clientss.Execute(requestss);
                            return responsess.Content;
                            break;

                        case "fork":
                            Console.WriteLine("forkkkkkkk");
                            var clients = new RestClient("https://api.github.com/repos/" + uname + "/" + repoName + "/forks");
                            var requests = new RestRequest(Method.POST);
                            requests.AddHeader("cache-control", "no-cache");
                            requests.AddHeader("Connection", "keep-alive");
                            requests.AddHeader("Accept-Encoding", "gzip, deflate");
                            requests.AddHeader("Host", "api.github.com");
                            requests.AddHeader("Postman-Token", "d3056e59-d436-44b2-b04b-1bc8105d3cf2,8c6331ee-79d0-419d-a960-e69fcfe0814a");
                            requests.AddHeader("Cache-Control", "no-cache");
                            requests.AddHeader("Accept", "/application/vnd.github.shadow-cat-preview+json");
                            requests.AddHeader("User-Agent", "PostmanRuntime/7.17.1");
                            requests.AddHeader("Authorization", "Bearer d66d3a2996dae3b8230e2fe8a5ce10e0605756a8");
                            IRestResponse responses = clients.Execute(requests);
                            return responses.Content;
                            break;

                        default:
                            Console.WriteLine("No oooooooooooooooooooooooo");
                            break;

                    }

                }
            }





            return CreatedAtRoute("GetEventsByApi", new { id = Uname.Id.ToString() }, Uname);



        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, ChatDetails eventsIn)
        {
            var events = _eventService.Get(id);

            if (events == null)
            {
                return NotFound();
            }

            _eventService.Update(id, eventsIn);

            return Ok(NoContent());
        }
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var events = _eventService.Get(id);

            if (events == null)
            {
                return NotFound();
            }

            _eventService.Remove(events.Id);

            return Ok(NoContent());
        }
    }
}