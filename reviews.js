const customerReviews = [
  {
    "id": 1,
    "name": "Deepak",
    "location": "Mumbai",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 2,
    "name": "Tariq",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "Very effective medicine.",
    "lang": "en"
  },
  {
    "id": 3,
    "name": "Karan",
    "location": "Pune",
    "rating": 5,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 4,
    "name": "Raj",
    "location": "Pune",
    "rating": 5,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 5,
    "name": "Uzma",
    "location": "Srinagar",
    "rating": 5,
    "text": "Totally natural and safe.",
    "lang": "en"
  },
  {
    "id": 6,
    "name": "Karan",
    "location": "Mumbai",
    "rating": 5,
    "text": "Very effective medicine.",
    "lang": "en"
  },
  {
    "id": 7,
    "name": "Fatima",
    "location": "Bhopal",
    "rating": 5,
    "text": "पूर्णपणे नैसर्गिक आणि सुरक्षित.",
    "lang": "mr"
  },
  {
    "id": 8,
    "name": "Hassan",
    "location": "Delhi",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 9,
    "name": "Nisha",
    "location": "Pune",
    "rating": 5,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 10,
    "name": "Rahul",
    "location": "Srinagar",
    "rating": 4,
    "text": "मला खूप फरक पडला.",
    "lang": "mr"
  },
  {
    "id": 11,
    "name": "Zainab",
    "location": "Kolkata",
    "rating": 5,
    "text": "Helped me a lot, highly recommend.",
    "lang": "en"
  },
  {
    "id": 12,
    "name": "Amit",
    "location": "Ahmedabad",
    "rating": 4,
    "text": "استعمال کے بعد بہت بہتر محسوس کر رہا ہوں۔",
    "lang": "ur"
  },
  {
    "id": 13,
    "name": "Deepak",
    "location": "Mumbai",
    "rating": 5,
    "text": "Asardar ilaj, koi side effect nahi.",
    "lang": "hi"
  },
  {
    "id": 14,
    "name": "Sunil",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 15,
    "name": "Hamza",
    "location": "Kolkata",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 16,
    "name": "Omar",
    "location": "Delhi",
    "rating": 5,
    "text": "Totally natural and safe.",
    "lang": "en"
  },
  {
    "id": 17,
    "name": "Saima",
    "location": "Hyderabad",
    "rating": 4,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 18,
    "name": "Aditya",
    "location": "Patna",
    "rating": 5,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  },
  {
    "id": 19,
    "name": "Iqra",
    "location": "Ahmedabad",
    "rating": 4,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 20,
    "name": "Omar",
    "location": "Mumbai",
    "rating": 5,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 21,
    "name": "Sneha",
    "location": "Mumbai",
    "rating": 5,
    "text": "खूप छान औषध आहे.",
    "lang": "mr"
  },
  {
    "id": 22,
    "name": "Nisha",
    "location": "Hyderabad",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 23,
    "name": "Gita",
    "location": "Patna",
    "rating": 4,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 24,
    "name": "Hamza",
    "location": "Bhopal",
    "rating": 4,
    "text": "Excellent results!",
    "lang": "en"
  },
  {
    "id": 25,
    "name": "Sana",
    "location": "Lucknow",
    "rating": 5,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 26,
    "name": "Hassan",
    "location": "Patna",
    "rating": 4,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 27,
    "name": "Vikram",
    "location": "Patna",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 28,
    "name": "Karan",
    "location": "Bhopal",
    "rating": 4,
    "text": "Asardar ilaj, koi side effect nahi.",
    "lang": "hi"
  },
  {
    "id": 29,
    "name": "Khadija",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "चांगला रिझल्ट आहे.",
    "lang": "mr"
  },
  {
    "id": 30,
    "name": "Zainab",
    "location": "Kolkata",
    "rating": 4,
    "text": "पूर्णपणे नैसर्गिक आणि सुरक्षित.",
    "lang": "mr"
  },
  {
    "id": 31,
    "name": "Vijay",
    "location": "Patna",
    "rating": 5,
    "text": "مکمل دیسی اور قدرتی۔",
    "lang": "ur"
  },
  {
    "id": 32,
    "name": "Khadija",
    "location": "Lucknow",
    "rating": 5,
    "text": "Authentic Unani formulation.",
    "lang": "en"
  },
  {
    "id": 33,
    "name": "Sneha",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "पूर्णपणे नैसर्गिक आणि सुरक्षित.",
    "lang": "mr"
  },
  {
    "id": 34,
    "name": "Ali",
    "location": "Ahmedabad",
    "rating": 4,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 35,
    "name": "Sana",
    "location": "Bhopal",
    "rating": 5,
    "text": "मला खूप फरक पडला.",
    "lang": "mr"
  },
  {
    "id": 36,
    "name": "Vijay",
    "location": "Delhi",
    "rating": 4,
    "text": "سو فیصد اصلی یونانی دوا۔",
    "lang": "ur"
  },
  {
    "id": 37,
    "name": "Sunil",
    "location": "Mumbai",
    "rating": 4,
    "text": "खूप छान औषध आहे.",
    "lang": "mr"
  },
  {
    "id": 38,
    "name": "Fatima",
    "location": "Bhopal",
    "rating": 5,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 39,
    "name": "Kavita",
    "location": "Kolkata",
    "rating": 5,
    "text": "سو فیصد اصلی یونانی دوا۔",
    "lang": "ur"
  },
  {
    "id": 40,
    "name": "Saima",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "Bahut acchi dawa hai.",
    "lang": "hi"
  },
  {
    "id": 41,
    "name": "Sana",
    "location": "Delhi",
    "rating": 5,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  },
  {
    "id": 42,
    "name": "Nida",
    "location": "Bhopal",
    "rating": 4,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 43,
    "name": "Salman",
    "location": "Kolkata",
    "rating": 5,
    "text": "مکمل دیسی اور قدرتی۔",
    "lang": "ur"
  },
  {
    "id": 44,
    "name": "Nisha",
    "location": "Delhi",
    "rating": 5,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  },
  {
    "id": 45,
    "name": "Rohan",
    "location": "Hyderabad",
    "rating": 4,
    "text": "१००% आयुर्वेदिक.",
    "lang": "mr"
  },
  {
    "id": 46,
    "name": "Meera",
    "location": "Bhopal",
    "rating": 5,
    "text": "Asardar ilaj, koi side effect nahi.",
    "lang": "hi"
  },
  {
    "id": 47,
    "name": "Gita",
    "location": "Bhopal",
    "rating": 5,
    "text": "Bahut acchi dawa hai.",
    "lang": "hi"
  },
  {
    "id": 48,
    "name": "Uzma",
    "location": "Lucknow",
    "rating": 5,
    "text": "100% original dawakhana.",
    "lang": "hi"
  },
  {
    "id": 49,
    "name": "Sneha",
    "location": "Bhopal",
    "rating": 5,
    "text": "Helped me a lot, highly recommend.",
    "lang": "en"
  },
  {
    "id": 50,
    "name": "Mariam",
    "location": "Hyderabad",
    "rating": 4,
    "text": "Very effective medicine.",
    "lang": "en"
  },
  {
    "id": 51,
    "name": "Ramesh",
    "location": "Delhi",
    "rating": 5,
    "text": "पूर्णपणे नैसर्गिक आणि सुरक्षित.",
    "lang": "mr"
  },
  {
    "id": 52,
    "name": "Anjali",
    "location": "Hyderabad",
    "rating": 4,
    "text": "खूप छान औषध आहे.",
    "lang": "mr"
  },
  {
    "id": 53,
    "name": "Zainab",
    "location": "Mumbai",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 54,
    "name": "Rahul",
    "location": "Bhopal",
    "rating": 5,
    "text": "मला खूप फरक पडला.",
    "lang": "mr"
  },
  {
    "id": 55,
    "name": "Ayesha",
    "location": "Mumbai",
    "rating": 4,
    "text": "ખૂબ જ અસરકારક દવા.",
    "lang": "gu"
  },
  {
    "id": 56,
    "name": "Priya",
    "location": "Mumbai",
    "rating": 4,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 57,
    "name": "Aarav",
    "location": "Hyderabad",
    "rating": 4,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 58,
    "name": "Khadija",
    "location": "Lucknow",
    "rating": 4,
    "text": "चांगला रिझल्ट आहे.",
    "lang": "mr"
  },
  {
    "id": 59,
    "name": "Uzma",
    "location": "Hyderabad",
    "rating": 5,
    "text": "Authentic Unani formulation.",
    "lang": "en"
  },
  {
    "id": 60,
    "name": "Hamza",
    "location": "Hyderabad",
    "rating": 4,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  },
  {
    "id": 61,
    "name": "Hamza",
    "location": "Delhi",
    "rating": 5,
    "text": "Very effective medicine.",
    "lang": "en"
  },
  {
    "id": 62,
    "name": "Fatima",
    "location": "Ahmedabad",
    "rating": 4,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 63,
    "name": "Tariq",
    "location": "Bhopal",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 64,
    "name": "Aditya",
    "location": "Patna",
    "rating": 5,
    "text": "मला खूप फरक पडला.",
    "lang": "mr"
  },
  {
    "id": 65,
    "name": "Iqra",
    "location": "Delhi",
    "rating": 5,
    "text": "استعمال کے بعد بہت بہتر محسوس کر رہا ہوں۔",
    "lang": "ur"
  },
  {
    "id": 66,
    "name": "Sneha",
    "location": "Pune",
    "rating": 5,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  },
  {
    "id": 67,
    "name": "Bushra",
    "location": "Patna",
    "rating": 5,
    "text": "100% original dawakhana.",
    "lang": "hi"
  },
  {
    "id": 68,
    "name": "Asma",
    "location": "Kolkata",
    "rating": 5,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 69,
    "name": "Zoya",
    "location": "Patna",
    "rating": 4,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 70,
    "name": "Khadija",
    "location": "Delhi",
    "rating": 4,
    "text": "मला खूप फरक पडला.",
    "lang": "mr"
  },
  {
    "id": 71,
    "name": "Priya",
    "location": "Patna",
    "rating": 5,
    "text": "१००% आयुर्वेदिक.",
    "lang": "mr"
  },
  {
    "id": 72,
    "name": "Bilal",
    "location": "Mumbai",
    "rating": 5,
    "text": "استعمال کے بعد بہت بہتر محسوس کر رہا ہوں۔",
    "lang": "ur"
  },
  {
    "id": 73,
    "name": "Omar",
    "location": "Mumbai",
    "rating": 5,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 74,
    "name": "Pooja",
    "location": "Bhopal",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 75,
    "name": "Vikram",
    "location": "Pune",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 76,
    "name": "Meera",
    "location": "Bhopal",
    "rating": 5,
    "text": "चांगला रिझल्ट आहे.",
    "lang": "mr"
  },
  {
    "id": 77,
    "name": "Deepak",
    "location": "Srinagar",
    "rating": 5,
    "text": "શુદ્ધ અને આયુર્વેદિક.",
    "lang": "gu"
  },
  {
    "id": 78,
    "name": "Karan",
    "location": "Mumbai",
    "rating": 5,
    "text": "ખૂબ જ અસરકારક દવા.",
    "lang": "gu"
  },
  {
    "id": 79,
    "name": "Uzma",
    "location": "Patna",
    "rating": 5,
    "text": "بہت اچھی دوا ہے، فائدہ ہوا۔",
    "lang": "ur"
  },
  {
    "id": 80,
    "name": "Sana",
    "location": "Srinagar",
    "rating": 5,
    "text": "حکیم صاحب کا نسخہ کمال کا ہے۔",
    "lang": "ur"
  },
  {
    "id": 81,
    "name": "Mariam",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "سو فیصد اصلی یونانی دوا۔",
    "lang": "ur"
  },
  {
    "id": 82,
    "name": "Asma",
    "location": "Mumbai",
    "rating": 5,
    "text": "Excellent results!",
    "lang": "en"
  },
  {
    "id": 83,
    "name": "Anjali",
    "location": "Lucknow",
    "rating": 5,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 84,
    "name": "Aarav",
    "location": "Patna",
    "rating": 5,
    "text": "حکیم صاحب کا نسخہ کمال کا ہے۔",
    "lang": "ur"
  },
  {
    "id": 85,
    "name": "Zoya",
    "location": "Bhopal",
    "rating": 5,
    "text": "શ્રેષ્ઠ પરિણામ મળ્યું.",
    "lang": "gu"
  },
  {
    "id": 86,
    "name": "Nisha",
    "location": "Kolkata",
    "rating": 5,
    "text": "१००% आयुर्वेदिक.",
    "lang": "mr"
  },
  {
    "id": 87,
    "name": "Zainab",
    "location": "Delhi",
    "rating": 4,
    "text": "ખૂબ જ અસરકારક દવા.",
    "lang": "gu"
  },
  {
    "id": 88,
    "name": "Fatima",
    "location": "Bhopal",
    "rating": 5,
    "text": "سو فیصد اصلی یونانی دوا۔",
    "lang": "ur"
  },
  {
    "id": 89,
    "name": "Ayesha",
    "location": "Kolkata",
    "rating": 5,
    "text": "चांगला रिझल्ट आहे.",
    "lang": "mr"
  },
  {
    "id": 90,
    "name": "Zainab",
    "location": "Hyderabad",
    "rating": 5,
    "text": "खूप छान औषध आहे.",
    "lang": "mr"
  },
  {
    "id": 91,
    "name": "Khadija",
    "location": "Pune",
    "rating": 4,
    "text": "Excellent results!",
    "lang": "en"
  },
  {
    "id": 92,
    "name": "Ritu",
    "location": "Delhi",
    "rating": 5,
    "text": "કોઈ આડઅસર નથી.",
    "lang": "gu"
  },
  {
    "id": 93,
    "name": "Mariam",
    "location": "Bhopal",
    "rating": 5,
    "text": "पूर्णपणे नैसर्गिक आणि सुरक्षित.",
    "lang": "mr"
  },
  {
    "id": 94,
    "name": "Salman",
    "location": "Ahmedabad",
    "rating": 5,
    "text": "Bahut acchi dawa hai.",
    "lang": "hi"
  },
  {
    "id": 95,
    "name": "Ayesha",
    "location": "Patna",
    "rating": 5,
    "text": "Puri tarah se natural hai.",
    "lang": "hi"
  },
  {
    "id": 96,
    "name": "Sneha",
    "location": "Srinagar",
    "rating": 5,
    "text": "سو فیصد اصلی یونانی دوا۔",
    "lang": "ur"
  },
  {
    "id": 97,
    "name": "Priya",
    "location": "Srinagar",
    "rating": 5,
    "text": "Totally natural and safe.",
    "lang": "en"
  },
  {
    "id": 98,
    "name": "Iqra",
    "location": "Hyderabad",
    "rating": 5,
    "text": "استعمال کے بعد بہت بہتر محسوس کر رہا ہوں۔",
    "lang": "ur"
  },
  {
    "id": 99,
    "name": "Bushra",
    "location": "Srinagar",
    "rating": 5,
    "text": "१००% आयुर्वेदिक.",
    "lang": "mr"
  },
  {
    "id": 100,
    "name": "Omar",
    "location": "Delhi",
    "rating": 4,
    "text": "Mujhe kafi aaram mila.",
    "lang": "hi"
  }
];