import {
  Mail,
  CircleDollarSign,
  Users,
  Building2,
  MessageSquareText,
  Library,
  Pen,
  Github,
  Calendar,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>
            <MessageSquareText />
            Contact Us
          </h3>
          <a href="mailto:avpstudentorgs@ucsd.edu">
            <Mail />
            avpstudentorgs@ucsd.edu
          </a>
          <a href="https://discord.gg/Wv4Et7w7Qy" target="_blank" rel="noopener noreferrer">
            <img className="discord-logo" alt="Discord Logo" src="/discord-mark-black.png"></img>{' '}
            Join our Discord!
          </a>
          <a href="http://calendly.com/avpstudentorgs" target="_blank" rel="noopener noreferrer">
            <Calendar />
            Schedule a Meeting
          </a>
        </div>

        <div className="footer-section">
          <h3>
            <Library />
            Resources
          </h3>
          <a href="https://getinvolved.ucsd.edu/" target="_blank" rel="noopener noreferrer">
            <Users />
            Center for Student Involvement
          </a>
          <a
            href="https://slbo.ucsd.edu/fund-management/team/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CircleDollarSign />
            Find Your SLBO Fund Manager
          </a>
          <a href="https://universitycenters.ucsd.edu/" target="_blank" rel="noopener noreferrer">
            <Building2 />
            University Centers
          </a>
        </div>

        <div className="footer-section">
          <h3>
            <Pen />
            Contribute
          </h3>
          <a
            href="https://github.com/AS-Office-of-Student-Organizations/AS-Funding-Guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            Contribute to this website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
