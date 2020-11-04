using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    [Authorize]
    public class UsersController : BaseApiController {
        private readonly IUserRepository _userRepository;
        public UsersController (IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }

        // api/users
        [HttpGet]
        // [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser () 
        {
            return Ok(await _userRepository.GetUsersAsync());
        }

        // [Authorize]
        // api/users/3
        [HttpGet ("{username}")]
        public async Task<ActionResult<AppUser>> GetUser (string username) {
            return await _userRepository.GetUserByUsernameAsync(username);
        }
    }
}