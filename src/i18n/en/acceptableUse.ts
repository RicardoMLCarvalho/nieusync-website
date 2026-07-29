type Section = { title: string; content: string | string[] };

const sections: Section[] = [
  {
    title: 'Scope of Application',
    content:
      'This Acceptable Use Policy applies to all users of the NIEUSYNC website, to clients of our services and to any person who interacts with NIEUSYNC digitally. By using our services, the user agrees to comply with these rules.',
  },
  {
    title: 'Permitted Uses',
    content: [
      'Accessing the website for informational and legitimate commercial purposes.',
      'Contacting NIEUSYNC through the channels made available in order to request information or services.',
      'Sharing blog content with attribution of the source and the original link.',
      'Using the contracted services in accordance with the Terms and Conditions.',
    ],
  },
  {
    title: 'Prohibited Uses',
    content: [
      'Using the website or the services for unlawful or fraudulent purposes, or for purposes that infringe the rights of third parties.',
      'Publishing or transmitting offensive, defamatory or obscene content, or content that incites hatred.',
      'Attempting to gain unauthorised access to NIEUSYNC systems, networks or data.',
      'Carrying out denial-of-service attacks (DoS/DDoS) or other forms of disruption.',
      'Sending spam or unsolicited communications through our forms.',
      'Extracting data from the website by automated means (web scraping) without authorisation.',
      'Impersonating NIEUSYNC or any member of its team.',
      'Reproducing, modifying or distributing copyright-protected content without authorisation.',
    ],
  },
  {
    title: 'Use of the Consultancy Services',
    content: [
      'The contracted services must be used for legitimate business purposes.',
      'Information shared by NIEUSYNC in the course of the services is confidential and is intended exclusively for the client’s use.',
      'Reselling or sublicensing NIEUSYNC services without written authorisation is not permitted.',
      'The client is responsible for ensuring that the information it shares with NIEUSYNC is true and complete.',
    ],
  },
  {
    title: 'Responsible Communication',
    content: [
      'All communication with NIEUSYNC must be conducted in a respectful and professional manner.',
      'Threats, insults or abusive conduct directed at the team will not be tolerated.',
      'NIEUSYNC reserves the right to terminate relationships with clients or users who breach these rules.',
    ],
  },
  {
    title: 'Security and Integrity',
    content: [
      'The user is responsible for the security of their access credentials to any restricted area.',
      'Any security vulnerability or misuse detected must be reported immediately.',
      'The use of automated tools to test the security of the website without authorisation is not permitted.',
    ],
  },
  {
    title: 'Consequences of Breach',
    content: [
      'Breach of this policy may result in the immediate suspension or termination of access to the services.',
      'NIEUSYNC reserves the right to report breaches to the competent authorities.',
      'The user may be held liable for damage caused by the breach of this policy.',
      'No refund of amounts paid will be made in the event of termination for breach of this policy.',
    ],
  },
  {
    title: 'Responsible Disclosure of Vulnerabilities',
    content: [
      'We encourage the responsible reporting of vulnerabilities to geral@nieusync.com, with technical details, steps to reproduce and expected impact.',
      'No payments are due unless a specific programme is expressly indicated.',
      'Public disclosure without a reasonable remediation period agreed with NIEUSYNC is prohibited.',
    ],
  },
  {
    title: 'Emails, Newsletters and Communications',
    content: [
      'The sending of newsletters or invitations depends on consent (where required) or on another valid lawful basis (e.g. B2B legitimate interests, with a clear opt-out).',
      'All messages will include identification of the sender and a mechanism to unsubscribe.',
    ],
  },
  {
    title: 'Export Control, Sanctions and Regulated Use',
    content: [
      'The User may not use the Website for activities subject to international sanctions, illicit financing or the export of controlled technologies without the necessary authorisations.',
      'The promotion of prohibited or highly regulated goods/services without proof of legal eligibility is prohibited.',
    ],
  },
  {
    title: 'Monitoring of Logs',
    content: [
      'NIEUSYNC may monitor use in order to ensure security and compliance, in accordance with the law and with our Privacy Policy.',
      'In the event of a breach, we may: (i) issue a warning, (ii) block content, (iii) suspend or terminate access, (iv) notify the authorities, (v) bring legal proceedings.',
      'We may preserve relevant logs for investigation purposes and to comply with legal obligations.',
    ],
  },
  {
    title: 'Amendments',
    content:
      'We may update this Acceptable Use Policy to reflect legal or operational changes. The version in force will be published on the Website with its revision date.',
  },
];

const acceptableUse = {
  title: 'Acceptable Use Policy',
  subtitle: 'Rules for the responsible use of our services and platform',
  lastUpdated: 'January 2025',
  docTitle: 'Acceptable Use Policy — NIEUSYNC',
  sections,
};

export type AcceptableUse = typeof acceptableUse;
export default acceptableUse;
