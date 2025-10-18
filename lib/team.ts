export type Person = {
  name: string
  roll?: string
  photo?: string // public path, e.g. /images/person.jpg or placeholder
  hostel?: string
}

export type DomainTeam = {
  name: string
  heads: Person[]
  coordinators: Person[]
}

export type TeamData = {
  overallCoordinator: Person
  domains: DomainTeam[]
  hrCouncil?: Person[]
}

// Demo data - replace with real people when ready
export const TEAM_DATA: TeamData = {
  overallCoordinator: {
    name: "Vinod Kumar",
    roll: "ME23BTECH11021",
    photo: "/TEAM/Vinod_Chandra_Kumar.jpg",
  },

  domains: [
    {
      name: "Finance",
      heads: [{ name: "Abhinay Shashanth", roll: "ME23BTECH11017", photo: "/TEAM/Abhinayshashanth.jpeg" }],
      coordinators: [
        { name: "Ananya", roll: "EE24B015", photo: "/TEAM/dummy1.jpg" },
        // { name: "Karan", roll: "CH24B022", photo: "/TEAM/" },
        // { name: "Lina", roll: "CS24B120", photo: "/TEAM/" },
      ],
    },

    {
      name: "PR and Mutlimedia",
      heads: [
        { name: "Ashok Kumar", roll: "ES23BTECH11027", photo: "/TEAM/Ashok_kumar.jpg" },
        { name: "Prabhu Teja", roll: "CS23BTECH11050", photo: "/TEAM/Prabhu_Teja.jpeg" },
        { name: "Sai Charan", roll: "BM23BTECH11014", photo: "/TEAM/Kunta_Sai_Charan.jpeg" },
        { name: "Pushpitha", roll: "ME23BTECH11025", photo: "/TEAM/Pushpitha.jpg" },
      ],
      coordinators: [
        { name: "Babu Mohan", roll: "CS24B110", photo: "/TEAM/BabuMohan.jpeg" },
        { name: "Kedarananda", roll: "ME24B076", photo: "/TEAM/Kedarananda.jpg" },
        { name: "Harshil Rathan", roll: "MA24B067", photo: "/TEAM/HarshilRathan.jpg" },
        { name: "Charan Naik", roll: "MA24B067", photo: "/TEAM/CharanNaik.webp" },
        { name: "Kalyani Cheguri", roll: "MA24B067", photo: "/TEAM/CheguriKalyani.jpg" },
        { name: "Akshay Kumar", roll: "MA24B067", photo: "/TEAM/AkshayKumar.png" },
        { name: "Ram Charan Reddy", roll: "MA24B067", photo: "/TEAM/RamCharanReddy.jpg" },
        { name: "M Namitha", roll: "MA24B067", photo: "/TEAM/Namitha.jpg" },
        { name: "Abhivardhan Nayak", roll: "MA24B067", photo: "/TEAM/Abhivardhan.jpg" },
        { name: "Aditya", roll: "MA24B067", photo: "/TEAM/Adithya.jpg" },
        { name: "Gajjula Vignesh", roll: "MA24B067", photo: "/TEAM/Vignesh.jpeg" },
        { name: "Arjun", roll: "MA24B067", photo: "/TEAM/Arjun.jpg" },
        { name: "Aashay Somkuwar", roll: "MA24B067", photo: "/TEAM/AashaySomkuwar.jpg" },
        { name: "Merwyn", roll: "MA24B067", photo: "/TEAM/Merwyn.jpg" },
        { name: "Neel Patel", roll: "MA24B067", photo: "/TEAM/NeelPatel.webp" },
      ],
    },
    
    {
      name: "Creatives",
      heads: [{ name: "Mohd Hasan", roll: "BD23BDES11014", photo: "/TEAM/Mohd_Hasan.jpg" }],
      coordinators: [
        { name: "Vidhi Siwal", roll: "EE24B015", photo: "/TEAM/VidhiSiwal.jpeg" },
        { name: "Dhruv", roll: "CH24B022", photo: "/TEAM/DhruvSunil.jpg" },
        { name: "Rasagna", roll: "CS24B120", photo: "/TEAM/Rasagna.jpg" },
        { name: "Suraj", roll: "CS24B120", photo: "/TEAM/Suraj.jpg" },
      ],
    },

    {
      name: "SponsorShip",
      heads: [
        { name: "Ankur Kalyan", roll: "MS23BTECH11005", photo: "/TEAM/Ankur.jpeg" },
        { name: "Sri Harini", roll: "ME23BTECH11054", photo: "/TEAM/Harini.jpeg" },
        { name: "Sreekar Reddy", roll: "ME23BTECH11065", photo: "/TEAM/VundyalaSreekarReddy.jpg" },
      ],
      coordinators: [
        { name: "Niketh", roll: "EE24B015", photo: "/TEAM/dummy1.jpg" },
        { name: "Prajwal", roll: "CH24B022", photo: "/TEAM/Prajwal.jpg" },
        { name: "Harsha Vardhan", roll: "CS24B120", photo: "/TEAM/HarshaVardhan.jpg" },
        { name: "Jayanth Ram", roll: "CS24B120", photo: "/TEAM/dummy1.jpg" },
        { name: "Dhanush Kumar", roll: "CS24B120", photo: "/TEAM/DhanushKumar.png" },
        { name: "Hemika Dipa", roll: "CS24B120", photo: "/TEAM/HemikaDipa.jpg" },
        { name: "BhavyaSri", roll: "CS24B120", photo: "/TEAM/BhavyaSri.jpg" },
      ],
    },

    {
      name: "Production and Pronites",
      heads: [
        { name: "Jatavath Ajay", roll: "AI23BTECH11011", photo: "/TEAM/Jatavath_Ajay.jpg" },
        { name: "Anveshchandra", roll: "IC23BTECH11005", photo: "/TEAM/Anveshchandra.jpg" },
        { name: "Harshit Vaibhav", roll: "MA23BTECH11006", photo: "/TEAM/Harshit_Vaibhav.jpg" },
      ],
      coordinators: [
        { name: "Dheekshith", roll: "CS24B110", photo: "/TEAM/Dheekshith.jpg" },
        { name: "Bhadrinath", roll: "ME24B076", photo: "/TEAM/Badrinath.jpg" },
        { name: "Saranya", roll: "MA24B067", photo: "/TEAM/Saranya.jpg" },
        { name: "Laasya Priya", roll: "MA24B067", photo: "/TEAM/dummy1.jpg" },
        { name: "Tejaswini", roll: "MA24B067", photo: "/TEAM/Tejaswini.jpeg" },
        { name: "Aishwarya", roll: "MA24B067", photo: "/TEAM/Aishwarya.jpg" },
        { name: "Bhavani Shankar", roll: "MA24B067", photo: "/TEAM/Bhavanisankar.webp" },
        { name: "Sai Dhanush Rathod", roll: "MA24B067", photo: "/TEAM/SaiDhanush.jpg" },
        { name: "Gowri Hamsika", roll: "MA24B067", photo: "/TEAM/GowriHamsika.jpg" },
      ],
    },
    
    {
      name: "Events",
      heads: [
        { name: "Shubham Gangwar", roll: "MS23BTECH11027", photo: "/TEAM/ShubhamGangwar.jpg" },
        { name: "Sai Kumar Reddy", roll: "CE23BTECH11021", photo: "/TEAM/SaiKumarReddy.jpg" },
        { name: "Sai Sathwik", roll: "ES23BTECH11020", photo: "/TEAM/SaiSathwikReddy.jpg" },
        { name: "M.Dheekshitha", roll: "CE23BTECH11030", photo: "/TEAM/Dheekshitha.jpg" },
      ],
      coordinators: [
        { name: "Neeraj Nayak", roll: "CS24B110", photo: "/TEAM/NeerajNayak.jpg" },
        { name: "Rahul Porika", roll: "ME24B076", photo: "/TEAM/RahulPorika.jpeg" },
        { name: "Aryan Dake", roll: "MA24B067", photo: "/TEAM/AryanDake.jpeg" },
        { name: "Sai Prudhvi", roll: "MA24B067", photo: "/TEAM/SaiPrudhvi.jpg" },
        { name: "Sai Charan", roll: "MA24B067", photo: "/TEAM/SaiCharan.jpg" },
        { name: "Utkarsh Dhawan", roll: "MA24B067", photo: "/TEAM/UtkarshDhawan.jpg" },
        { name: "Sai Teja Reddy", roll: "MA24B067", photo: "/TEAM/SaiTejaReddy.jpg" },
        { name: "Yashwanth Nayak", roll: "MA24B067", photo: "/TEAM/Yashwanth.jpg" },
        { name: "Pavan Dev", roll: "MA24B067", photo: "/TEAM/PavanDev.jpg" },
        { name: "Susheel Chandra", roll: "MA24B067", photo: "/TEAM/Susheel.jpg" },
        { name: "Sai Karthik", roll: "MA24B067", photo: "/TEAM/SaiKarthik.jpg" },
        { name: "Mohit Sagar", roll: "MA24B067", photo: "/TEAM/MohitSagar.jpg" },
        { name: "Sreya Kilaru", roll: "MA24B067", photo: "/TEAM/Sreya.jpg" },
        { name: "Mohit Singh", roll: "MA24B067", photo: "/TEAM/Mohit.jpg" },
        { name: "Pratyush Prakash", roll: "MA24B067", photo: "/TEAM/PratyushPrakash.jpeg" },
      ],
    },

  
    {
      name: "Hospitality",
      heads: [
        { name: "Mahani", roll: "ES23BTECH11023", photo: "/TEAM/Kunche_Mahani.jpeg" },
        { name: "Ashwin Kumar", roll: "ME22BTECH11027", photo: "/TEAM/Kaveri_Ashwin_Kumar.webp" },
        { name: "Roja Hasini", roll: "ME23BTECH11062", photo: "/TEAM/RojaHasiniVadapalli.jpg" },
        { name: "Vamsi Krishna", roll: "ME23BTECH11052", photo: "/TEAM/vamsi.jpg" }
      ],
      coordinators: [
        { name: "Manvik", roll: "BT24B017", photo: "/TEAM/Manvik.jpeg" },
        { name: "Manmohan Reddy", roll: "BT24B018", photo: "/TEAM/ManmohanReddy.jpeg" },
        { name: "Sravya", roll: "BT24B017", photo: "/TEAM/Sravya.jpeg" },
        { name: "Sonali", roll: "CSE", photo: "/TEAM/Sonali.jpg" },
        { name: "Hasini", roll: "BT24B017", photo: "/TEAM/Hasini.jpg" },
        { name: "Dhathvi Charan", roll: "CSE", photo: "/TEAM/DhathviCharan.jpg" },
        { name: "Sai Avinash", roll: "BT24B017", photo: "/TEAM/SaiAvinash.jpg" },
        { name: "Dindima ", roll: "BT24B017", photo: "/TEAM/Dindima.jpg" },
        { name: "Hari Karthik", roll: "BT24B017", photo: "/TEAM/HariKarthik.png" },
        { name: "Ram Prasad", roll: "BT24B017", photo: "/TEAM/RamPrasad.webp" },
        { name: "Vishnu Vardhan", roll: "BT24B017", photo: "/TEAM/VishnuVardhan.jpg" },
        { name: "Paramata vicky", roll: "BT24B017", photo: "/TEAM/ParamataVicky.webp" },
        { name: "Manohar", roll: "BT24B017", photo: "/TEAM/Manohar.jpg" },
        { name: "Rishwanth ", roll: "CSE", photo: "/TEAM/RishwanthKumar.jpg" },
        { name: "Akhil", roll: "Civil", photo: "/TEAM/Akhil.jpg" },
        { name: "Zenith N", roll: "BT24B017", photo: "/TEAM/Zenith.jpg" },
        { name: "Sai Chandhan", roll: "BT24B017", photo: "/TEAM/SaiChandan.jpg" },
      ],
    },
    {
      name: "Web",
      heads: [
        { name: "Manne Rithvik", roll: "ES23BTECH11025", photo: "/TEAM/Manne_Rithvik.jpg" },
        { name: "Tejasri Namagiri", roll: "EP23BTECH11018", photo: "/TEAM/Tejasri.jpg" },
        { name: "Praveen Nayak", roll: "IC23BTECH11004", photo: "/TEAM/Praveen.jpg" },
      ],
      coordinators: [
        { name: "Rohith", roll: "CH24B022", photo: "/TEAM/Rohith.jpg" },
        { name: "Prajin", roll: "CS24B120", photo: "/TEAM/Prajin.jpg" },
        { name: "Sriram", roll: "EE24B015", photo: "/TEAM/Sriram.jpg" },
        { name: "Tejaswi", roll: "CS24B120", photo: "/TEAM/Tejaswi.jpg" },
        { name: "Gayatri", roll: "CS24B120", photo: "/TEAM/Gayatri.jpg" },
      ],
    },
  ],
    
}