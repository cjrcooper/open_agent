using System;

namespace openAgent.Models
{
    public class Address
    {
        public Address()
        {
            DateAdded = DateTime.Now;
        }
        public int Id { get; set; }
        public string StreetAddress { get; set; }
        public string Suburb { get; set; }
        public int Postcode { get; set; }
        public string State { get; set; }
        public string Unit{ get; set; } 
        public DateTime? DateAdded { get; set; }
    }
}