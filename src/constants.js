// ponytail: shared constant, used by HeroSection and Footer
const emailId = 'tkjs.koushik@gmail.com';
const subject = encodeURIComponent('Inquiry: Collaborating on a New Project');
const body = encodeURIComponent(
  `Hi Koushik,\n\nI visited your portfolio and would love to discuss a potential project collaboration.\n\nProject Details:\n- Project Type: [ Design / Development / Full-Stack / Creative Coding ]\n- Desired Timeline: [ e.g., 1-2 months ]\n- Rough Budget Range: [ e.g., $X,XXX ]\n- Project Description: \n\nLooking forward to connecting!\n\nBest,\n[ Your Name ]\n[ Your Company / Website ]`
);

export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailId}&su=${subject}&body=${body}`;
