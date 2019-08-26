using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace openAgent.Models
{

    public class DbAccessLayer
    {
        private readonly DbContext _db = new DbContext(new DbContextOptions<DbContext>());
        
        public async Task<Address> FindAddressAsync(int id)
        {
            return await _db.Address.FindAsync(id);
        }
        
        public IEnumerable<Address> FindAllAddresses()
        {
            return _db.Address.ToList();
        }
        
        public async Task AddAddressAsync(Address address)
        {
            _db.Address.Add(address);
            await _db.SaveChangesAsync();
        }
        
        public async Task DeleteAddressAsync(int id)
        {
            var address = _db.Address.Find(id);
            _db.Address.Remove(address);
            await _db.SaveChangesAsync();
      
        }
        
        public async Task EditAddressAsync(Address address)
        {
            _db.Attach(address);
            _db.Entry(address);
            await _db.SaveChangesAsync();
        }
        
    }
}