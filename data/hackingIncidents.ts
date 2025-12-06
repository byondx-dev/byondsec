export interface HackingIncident {
    name: string;
    year: string;
    amount: number;
    currency: string; // 'USD', 'EUR', 'GBP', etc.
    description: string;
    details: string;
}

export const hackingIncidents: HackingIncident[] = [
    {
        name: "NotPetya",
        year: "2017",
        amount: 10000000000,
        currency: "USD",
        description: "Global Wiper disguised as Ransomware",
        details: "Originally targeting Ukraine software, it spread globally hitting Maersk, Merck, FedEx. Considered the most costly cyberattack in history."
    },
    {
        name: "Epsilon Breach",
        year: "2011",
        amount: 4000000000,
        currency: "USD",
        description: "Email Marketing Giant Breach",
        details: "Stolen names/emails from banks and retailers (JPMorgan, Best Buy). Costs surged due to customer churn and legal settlements."
    },
    {
        name: "WannaCry",
        year: "2017",
        amount: 8000000000,
        currency: "USD",
        description: "Global Ransomware Worm",
        details: "Exploited EternalBlue against unpatched Windows systems. Severely impacted the NHS, logistics, and telecom sectors worldwide."
    },
    {
        name: "Change Healthcare",
        year: "2024",
        amount: 2450000000,
        currency: "USD",
        description: "BlackCat/ALPHV Ransomware",
        details: "$22M ransom paid. Disruptions to US healthcare billing affected millions of patients and thousands of pharmacies."
    },
    {
        name: "Marriott / Starwood",
        year: "2018",
        amount: 12500000000, // Using the high "potential damage" estimate from user text to be impactful
        currency: "USD",
        description: "500 Million Guests Data Exfiltrated",
        details: "Attackers present for years. Compromised passports and travel data. fines and mandatory security overhauls followed."
    },
    {
        name: "Equifax",
        year: "2017",
        amount: 1400000000,
        currency: "USD",
        description: "Credit Bureau Breach",
        details: "147M people's sensitive data exposed via unpatched Apache Struts. Massive response costs and settlements."
    },
    {
        name: "Yahoo",
        year: "2013",
        amount: 350000000,
        currency: "USD",
        description: "3 Billion Accounts Hacked",
        details: "The largest breach by count. Resulted in a $350M price cut during the Verizon acquisition."
    },
    {
        name: "MediaMarkt - Hive",
        year: "2021",
        amount: 50000000,
        currency: "USD",
        description: "Hive Ransomware Attack",
        details: "Stores and IT offline across Europe. Initial demand was $240M, negotiated down but damage remains in high millions."
    },
    {
        name: "Amey PLC",
        year: "2020",
        amount: 2000000000,
        currency: "USD",
        description: "Moonshot Ransom Demand",
        details: "UK waste management firm faced an absurd $2B demand. Shows how extortionists set anchor amounts."
    },
    {
        name: "Target",
        year: "2013",
        amount: 290000000,
        currency: "USD",
        description: "Retail POS Breach",
        details: "Attackers entered via HVAC vendor. 40M cards stolen. A textbook case for third-party risk management."
    },
    {
        name: "TJX Companies",
        year: "2007",
        amount: 256000000,
        currency: "USD",
        description: "Massive Wi-Fi Card Theft",
        details: "45M+ cards stolen via weak WEP encryption. Driven major push for PCI-DSS compliance."
    },
    {
        name: "Hannaford Bros",
        year: "2008",
        amount: 252000000,
        currency: "USD",
        description: "Supermarket Malware",
        details: "Malware on POS servers in 300 stores. 4.2M cards stolen despite PCI compliance."
    },
    {
        name: "Sony PSN",
        year: "2011",
        amount: 171000000,
        currency: "USD",
        description: "PlayStation Network Hack",
        details: "77M accounts compromised. PSN offline for weeks. Huge reputational damage and regulatory fines."
    },
    {
        name: "Home Depot",
        year: "2014",
        amount: 198000000,
        currency: "USD",
        description: "POS Malware Attack",
        details: "56M cards compromised via stolen vendor credentials. Costly settlements with banks and states."
    },
    {
        name: "MGM Resorts",
        year: "2023",
        amount: 100000000,
        currency: "USD",
        description: "Social Engineering Attack",
        details: "Scattered Spider group caused chaos in Las Vegas. Hotel bookings, slots, and check-ins down for days."
    },
    {
        name: "Caesars Entertainment",
        year: "2023",
        amount: 15000000,
        currency: "USD",
        description: "Paid Ransom",
        details: "Paid ~$15M (half of demand) to protect loyalty program data. Criticized for fueling the ransomware economy."
    },
    {
        name: "Cencora",
        year: "2024",
        amount: 75000000,
        currency: "USD",
        description: "Record Ransom Payment",
        details: "Fortune 50 pharma distributor paid ~$75M to Dark Angels gang to prevent leak of healthcare data."
    },
    {
        name: "Kaseya - REvil",
        year: "2021",
        amount: 70000000,
        currency: "USD",
        description: "Supply Chain Ransomware",
        details: "REvil demanded $70M for a universal decryptor after hitting hundreds of MSPs and thousands of customers."
    },
    {
        name: "CNA Financial",
        year: "2021",
        amount: 40000000,
        currency: "USD",
        description: "Insurer Paid Ransom",
        details: "One of the largest payments at the time ($40M). Attackers used a fake browser update for initial access."
    },
    {
        name: "Colonial Pipeline",
        year: "2021",
        amount: 4400000,
        currency: "USD",
        description: "Critical Infrastructure Halt",
        details: "Resulted in fuel shortages on US East Coast. FBI recovered part of the $4.4M ransom."
    },
    {
        name: "JBS Foods",
        year: "2021",
        amount: 11000000,
        currency: "USD",
        description: "Meat Supply Chain Hit",
        details: "Paid $11M to REvil after meat plants in USA/AU/CA stopped. Highlighted food supply vulnerability."
    },
    {
        name: "Royal Mail",
        year: "2023",
        amount: 80000000,
        currency: "USD",
        description: "LockBit Ransomware",
        details: "International shipping halted. Attackers demanded $80M. Royal Mail refused to pay."
    },
    {
        name: "CWT Travel",
        year: "2020",
        amount: 4500000,
        currency: "USD",
        description: "Travel Giant Extorted",
        details: "Haggled ransom down from $10M to $4.5M via chat. 30k endpoints affected during COVID crisis."
    },
    {
        name: "Anthem",
        year: "2015",
        amount: 179000000,
        currency: "USD",
        description: "Health Insurance Breach",
        details: "80M people affected. $115M settlement + fines. Largest health data breach of its time."
    },
    {
        name: "Saudi Aramco",
        year: "2012",
        amount: 50000000,
        currency: "USD",
        description: "Shamoon Wiper",
        details: "35,000 workstations destroyed. Replaced hardware cost >$50M. A warning on destructive cyber sabotage."
    },
    {
        name: "Sepah Bank",
        year: "2025",
        amount: 42000000,
        currency: "USD",
        description: "Iran Bank Data Leak",
        details: "42M customer records stolen. Attackers demanded $42M. Data leaked after non-payment."
    },
    {
        name: "Marks & Spencer",
        year: "2025",
        amount: 60000000,
        currency: "GBP",
        description: "Online Sales Halt",
        details: "Online operations down for 3 weeks. Insurance likely to pay out up to £100M."
    },
    {
        name: "Uber",
        year: "2016",
        amount: 148000000,
        currency: "USD",
        description: "Cover-up Scandal",
        details: "$148M settlement for concealing the breach. Hackers were initially paid via bug bounty program to stay quiet."
    },
    {
        name: "Snowflake / AT&T",
        year: "2024",
        amount: 100000000, // Estimate for high impact multi-company breach
        currency: "USD",
        description: "Cloud Credential Theft",
        details: "Credential stuffing on Snowflake accounts hit Ticketmaster, AT&T. Massive downstream costs."
    },
    {
        name: "Coupang",
        year: "2025",
        amount: 2000000000,
        currency: "USD",
        description: "South Korean E-Commerce",
        details: "33M users affected. Potential damages >$2B from class actions and fines."
    }
];
