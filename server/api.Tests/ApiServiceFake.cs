using api.Models;
using api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace api.Tests
{
    public class ApiServiceFake : IApiService
    {
        private readonly List<ChatDetails> _chatdetails;

        public ApiServiceFake()
        {
            _chatdetails = new List<ChatDetails>()
            {
                new ChatDetails(){
                    Id="1234567", Uname="MehulG", Message="create a new repo", Client= true , Date= "1234"},
                 new ChatDetails(){
                    Id="2345678", Uname="MehulG", Message="create a new repo", Client=true  , Date="1313r89y93"},
                  new ChatDetails(){
                    Id="3456789", Uname="MehulG", Message="create a new repo", Client=true , Date="1313r89y93"}
            };
        }

        public List<ChatDetails> Get()
        {
            return _chatdetails;
        }

       public ChatDetails Get(string id)
        {
            return _chatdetails.Where(a => a.Id == id)
           .FirstOrDefault();
        }
        public ChatDetails Create(ChatDetails newItem)
        {
            newItem.Id = "134527282";
            _chatdetails.Add(newItem);
            return newItem;
        }
        public void Update(string id, ChatDetails bookIn)
        {

        }

        public void Remove(string id)
        {

        }

        public ChatDetails GetByName(string Uname)
        {
            return _chatdetails.Where(a => a.Uname == Uname)
          .FirstOrDefault();
        }

    }
}
