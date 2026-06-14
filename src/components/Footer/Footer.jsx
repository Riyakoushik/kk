import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-full h-auto px-6 md:px-12 mt-12 pb-16 font-manrope bg-black'>
            <div className="max-w-[1600px] mx-auto">
                <div>
                    <MarqueeText />
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-16">
                    <div className="flex justify-center items-center gap-3">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='border border-[#c4c1b9]/40 hover:border-[#c4c1b9] hover:bg-white/5 rounded-full p-4 text-[#f2ede5] transition-all active:scale-95 flex items-center justify-center' aria-label="Instagram">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='border border-[#c4c1b9]/40 hover:border-[#c4c1b9] hover:bg-white/5 rounded-full p-4 text-[#f2ede5] transition-all active:scale-95 flex items-center justify-center' aria-label="LinkedIn">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className='border border-[#c4c1b9]/40 hover:border-[#c4c1b9] hover:bg-white/5 rounded-full p-4 text-[#f2ede5] transition-all active:scale-95 flex items-center justify-center' aria-label="GitHub">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="mailto:email@example.com" className='border border-[#c4c1b9]/40 hover:border-[#c4c1b9] hover:bg-white/5 rounded-full p-4 text-[#f2ede5] transition-all active:scale-95 flex items-center justify-center' aria-label="Email">
                            <FaEnvelope className="text-xl" />
                        </a>
                    </div>

                    <div>
                        <p className="text-[14px] text-[#b1a696] text-center md:text-right italic leading-relaxed">
                            "If you don't take risks, you can't create a future."<br />
                            <span className="text-[12px] opacity-80 not-italic">— Monkey D. Luffy</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;
