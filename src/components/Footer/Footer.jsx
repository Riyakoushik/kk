import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-screen h-auto px-6 mt-10 pb-16'>
            <div>
                <MarqueeText />
            </div>

            <div className="w-full flex justify-between items-center mt-20">
                <div className="flex justify-center items-center gap-1">
                    <div className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5]'><FaInstagram className="text-xl" /></div>
                    <div className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5]'><FaLinkedin className="text-xl" /></div>
                    <div className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5]'><FaGithub className="text-xl" /></div>
                    <div className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5]'><FaEnvelope className="text-xl" /></div>
                </div>

                <div>
                    <p className="text-[0.8rem] text-[#b1a696] text-right italic">
                        "If you don't take risks, you can't create a future."<br />
                        — Monkey D. Luffy
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;
