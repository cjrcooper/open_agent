using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using openAgent.Models;

namespace openAgent.Controllers
{
    public class AddressController : Controller
    {
        private readonly DbAccessLayer _context = new DbAccessLayer();

        [HttpGet]
        [Route("api/Address/Index")]
        [ProducesResponseType(typeof(IEnumerable<Address>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Index()
        {
            try
            {
                var addresses = _context.FindAllAddresses();
                return Ok(addresses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        
        [HttpPost]
        [Route("api/Address/Add")]
        [ProducesResponseType(typeof(Address),StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddAddressAsync(Address address)
        {
            try
            {
                await _context.AddAddressAsync(address);
                return Ok(address);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("api/Address/Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _context.DeleteAddressAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
               return BadRequest(ex);
            }
        }
        
        [HttpPost]
        [Route("api/Address/Edit")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Edit([FromForm] Address address)
        {
            try
            {
                await _context.EditAddressAsync(address);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        
        [HttpGet]
        [Route("api/Address/Find/{id}")]
        [ProducesResponseType(typeof(Address),StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Edit(int id)
        {
            try
            {
                var address = await _context.FindAddressAsync(id);
                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}