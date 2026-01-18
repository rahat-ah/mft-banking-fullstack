import React from 'react'

function BankingOfficers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-blue-700 mb-12 text-center">Meet Our Officers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Rahat Ahmed", role: "Manager", img: "https://randomuser.me/api/portraits/men/32.jpg" },
          { name: "Karim Hossain", role: "Loan Officer", img: "https://randomuser.me/api/portraits/men/45.jpg" },
          { name: "Sadia Akter", role: "Customer Support", img: "https://randomuser.me/api/portraits/women/65.jpg" },
          { name: "Nayeem Islam", role: "Accountant", img: "https://randomuser.me/api/portraits/men/23.jpg" },
        ].map((officer, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 text-center transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={officer.img}
              alt={officer.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-700">{officer.name}</h3>
            <p className="text-gray-500">{officer.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BankingOfficers