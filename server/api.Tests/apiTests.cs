using System;
using Xunit;
using api.Controllers;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using System.Collections.Generic;

namespace api.Tests
{
    public class apiTests
    {
        ApiServiceController _controller;
        IApiService _service;

        public apiTests()
        {
            _service = new ApiServiceFake();
            _controller = new ApiServiceController(_service);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.Get();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }
        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.Get().Result as OkObjectResult;

            // Assert
            var items = Assert.IsType<List<ChatDetails>>(okResult.Value);
            Assert.Equal(3, items.Count);

        }
        [Fact]
        public void Remove_ExistingPassed_ReturnsOkResult()
        {
            // Arrange
            var existingGuid = "1234567";

            // Act
            var okResponse = _controller.Delete(existingGuid);

            // Assert
            Assert.IsType<OkObjectResult>(okResponse);
        }
        [Fact]
        public void Update_ExistingPassed_ReturnsOkResult()
        {
            // Arrange
            var existingGuid = "1234567";
            ChatDetails cd = new ChatDetails()
            {
                Uname = "Abhishek",
                Message = "create a new repo",
                Client = true,
                Date = "1234"
            };
            // Act
            var okResponse = _controller.Update(existingGuid, cd);

            // Assert
            Assert.IsType<OkObjectResult>(okResponse);
        }

    }
}
