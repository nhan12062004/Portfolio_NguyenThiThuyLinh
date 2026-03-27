/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  Mail, 
  Linkedin, 
  Facebook,
  ChevronRight,
  Download,
  Moon,
  Sun,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2, 
  AlertCircle, 
  Loader2
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const navItems = [
  { name: "Trang chủ", href: "#home", icon: Home },
  { name: "Giới thiệu", href: "#about", icon: User },
  { name: "Kỹ năng", href: "#skill", icon: Code2 },
  { name: "Kinh nghiệm", href: "#experience", icon: Briefcase },
  { name: "Liên hệ", href: "#contact", icon: Mail },
];

const skills = [
  { name: "Quản lý & Phát triển MXH (FB, TikTok, YT)", level: 90 },
  { name: "Viết bài chuẩn SEO & Nội dung truyền thông", level: 85 },
  { name: "Quay & Dựng Video (Canva, CapCut, Premiere)", level: 85 },
  { name: "Thiết kế hình ảnh (Photoshop, Canva)", level: 80 },
  { name: "Booking KOL/KOC & Hỗ trợ Livestream", level: 75 },
  { name: "Kỹ năng mềm (Giao tiếp, Teamwork, Time Mgmt)", level: 95 },
];

const workExperiences = [
  {
    company: "Công ty Cổ phần MISA",
    role: "Thực tập sinh Marketing",
    period: "01/2026 - 03/2026",
    description: "Viết kịch bản TikTok (hộ kinh doanh), chỉnh sửa video kịch bản đăng TikTok (AMIS - Hộ kinh doanh).\nPhối hợp với team marketing triển khai nội dung truyền thông."
  },
  {
    company: "X - com",
    role: "Video Production Assistant",
    period: "08/2024 - 12/2024",
    description: "Hỗ trợ quay, dựng video sản phẩm áo thun (3 video/ngày).\nChuẩn bị thiết bị quay và tạo dựng hậu trường chuyên nghiệp."
  },
  {
    company: "Halo VN",
    role: "CTV TikTok",
    period: "08/2023 - 02/2024",
    description: "Xây kênh TikTok (>200 follower), quay dựng video (3 video/ngày).\nBooking KOL/KOC (10 KOL/tuần) và tham gia livestream TikTok, Shopee (doanh thu ~2 triệu/phiên)."
  },
  {
    company: "Overa Group",
    role: "CTV Media",
    period: "02/2023 - 07/2023",
    description: "Quản lý các trang mạng xã hội (Youtube, TikTok) với tần suất 3 video/ngày.\nChụp và chỉnh sửa ảnh/video sản phẩm trên PS, Premiere, Canva (15 ảnh, 3 video/ngày)."
  }
];

const activities = [
  {
    company: "CLB Truyền thông UNETI",
    role: "Thành viên Ban Nội dung",
    period: "11/2022 - 02/2023",
    description: "Viết nội dung cho các hoạt động của CLB trên MXH.\nHost kênh TikTok về ẩm thực của CLB."
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skill", "experience", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#ff4d8d] selection:text-white ${
      isDarkMode ? "bg-[#121212] text-white" : "bg-[#fff5f7] text-[#1a1a1a]"
    }`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff4d8d] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md border-b z-40 transition-colors duration-500 ${
        isDarkMode ? "bg-[#121212]/80 border-gray-800" : "bg-white/80 border-pink-100"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Portfolio<span className="text-[#ff4d8d]">.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#ff4d8d] ${
                  activeSection === item.href.replace("#", "") 
                    ? "text-[#ff4d8d]" 
                    : isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.name}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-pink-50 text-pink-500 hover:bg-pink-100"
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button className="md:hidden p-2">
            <div className={`w-6 h-0.5 mb-1.5 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
            <div className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
          </button>
        </div>
      </nav>

      {/* Sections */}
      <main>
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-sm uppercase tracking-[0.3em] mb-6 font-semibold ${
                isDarkMode ? "text-pink-400" : "text-pink-300"
              }`}>
                Thực tập sinh Marketing
              </h2>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
              >
                Nguyễn Thị <br />
                <span className={`${isDarkMode ? "text-pink-500" : "text-pink-400"} italic font-serif`}>Thùy Linh</span>
              </motion.h1>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Mong muốn áp dụng kiến thức Quản trị kinh doanh và kinh nghiệm thực tiễn 
                trong lĩnh vực Content & Social Media Marketing để tạo ra giá trị bền vững cho thương hiệu.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-[#ff4d8d] text-white rounded-full font-medium hover:bg-[#e63e7a] transition-all flex items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  Liên hệ ngay <ChevronRight size={18} />
                </a>
                <a 
                  href="/CV_NguyenThiThuyLinh.pdf"
                  download="CV_NguyenThiThuyLinh.pdf"
                  className={`px-8 py-4 border rounded-full font-medium transition-all flex items-center gap-2 ${
                    isDarkMode ? "border-gray-700 hover:bg-gray-800" : "border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  Tải CV <Download size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-32 px-6 transition-colors duration-500 ${
          isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={`aspect-[4/5] rounded-3xl overflow-hidden relative group ${
                  isDarkMode ? "bg-gray-800" : "bg-pink-50"
                }`}>
                  <img 
                    src="/profile.jpg" 
                    alt="Nguyễn Thị Thùy Linh" 
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 group-hover:bg-transparent transition-all" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold tracking-tight mb-8">Giới thiệu</h2>
                <div className={`space-y-6 text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  <p>
                    Tôi là sinh viên năm 4 ngành Quản trị kinh doanh tại Đại học Kinh tế - Kỹ thuật Công nghiệp Hà Nội. Với tinh thần ham học hỏi và khả năng nắm bắt xu hướng nhanh, tôi luôn nỗ lực hoàn thiện bản thân trong lĩnh vực Marketing.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-pink-400" : "bg-pink-50 text-pink-500"}`}>
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">Học vấn</h4>
                        <p className="text-sm opacity-80">ĐH Kinh tế - Kỹ thuật Công nghiệp Hà Nội (2022 - 2026)</p>
                        <p className="text-sm opacity-80">Ngành: Quản trị kinh doanh</p>
                        <p className="text-sm opacity-80">Chuyên ngành: Quản trị Tổng hợp</p>
                        <p className="text-sm font-semibold text-[#ff4d8d]">GPA hiện tại: 3.3/4</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-pink-400" : "bg-pink-50 text-pink-500"}`}>
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">Chứng chỉ</h4>
                        <p className="text-sm opacity-80">Chứng chỉ Tin học Văn phòng MOS (2022)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-pink-100/20">
                    <div>
                      <h4 className={`text-3xl font-bold ${isDarkMode ? "text-pink-400" : "text-pink-500"}`}>2+</h4>
                      <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Năm kinh nghiệm</p>
                    </div>
                    <div>
                      <h4 className={`text-3xl font-bold ${isDarkMode ? "text-pink-400" : "text-pink-500"}`}>10+</h4>
                      <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Dự án tham gia</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skill Section */}
        <section id="skill" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Kỹ năng chuyên môn</h2>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} max-w-xl mx-auto`}>
                Kết hợp giữa tư duy quản trị và kỹ năng thực thi Marketing đa kênh.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">{skill.name}</span>
                    <span className={isDarkMode ? "text-pink-400" : "text-pink-500"}>{skill.level}%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                    isDarkMode ? "bg-gray-800" : "bg-pink-100"
                  }`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-[#ff4d8d]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-32 px-6 transition-colors duration-500 ${
          isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
        }`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight mb-20 text-center">Kinh nghiệm làm việc</h2>
            
            <div className="space-y-12 mb-32">
              {workExperiences.map((exp, index) => (
                <motion.div 
                  key={exp.company + exp.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group relative grid md:grid-cols-[1fr,2fr] gap-8 p-8 rounded-3xl transition-all border ${
                    isDarkMode 
                      ? "hover:bg-gray-800 border-transparent hover:border-gray-700" 
                      : "hover:bg-pink-50 border-transparent hover:border-pink-100"
                  }`}
                >
                  <div>
                    <span className={`text-sm font-semibold uppercase tracking-widest ${
                      isDarkMode ? "text-pink-400" : "text-pink-300"
                    }`}>
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{exp.company}</h3>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-black/80"}`}>{exp.role}</h4>
                    <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h2 className="text-4xl font-bold tracking-tight mb-20 text-center">Hoạt động</h2>
            
            <div className="space-y-12">
              {activities.map((act, index) => (
                <motion.div 
                  key={act.company + act.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group relative grid md:grid-cols-[1fr,2fr] gap-8 p-8 rounded-3xl transition-all border ${
                    isDarkMode 
                      ? "hover:bg-gray-800 border-transparent hover:border-gray-700" 
                      : "hover:bg-pink-50 border-transparent hover:border-pink-100"
                  }`}
                >
                  <div>
                    <span className={`text-sm font-semibold uppercase tracking-widest ${
                      isDarkMode ? "text-pink-400" : "text-pink-300"
                    }`}>
                      {act.period}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{act.company}</h3>
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-black/80"}`}>{act.role}</h4>
                    <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {act.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">
                  Kết nối với <br />
                  tôi nhé!
                </h2>
                <p className={`text-xl mb-12 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Tôi luôn sẵn sàng cho những cơ hội mới và những dự án sáng tạo.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800 text-pink-400" : "bg-pink-50 text-pink-500"
                    }`}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-widest">Số điện thoại</p>
                      <p className="font-medium">0915517300</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800 text-pink-400" : "bg-pink-50 text-pink-500"
                    }`}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-widest">Email</p>
                      <p className="font-medium">linhnguyen02082003@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800 text-pink-400" : "bg-pink-50 text-pink-500"
                    }`}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-widest">Địa chỉ</p>
                      <p className="font-medium">Thanh Trì, Hoàng Mai, Hà Nội</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-8">
                    {[
                      { Icon: Facebook, url: "https://www.facebook.com/linh.nem.2024" },
                      { Icon: Linkedin, url: "https://www.linkedin.com/in/nguy%E1%BB%85n-linh-07794b218/" }
                    ].map(({ Icon, url }, i) => (
                      <a 
                        key={i} 
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                          isDarkMode 
                            ? "border-gray-700 hover:bg-pink-500 hover:text-white" 
                            : "border-pink-200 hover:bg-[#ff4d8d] hover:text-white"
                        }`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`p-10 rounded-[2rem] shadow-sm border transition-colors duration-500 relative overflow-hidden ${
                  isDarkMode ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-pink-100"
                }`}
              >
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Họ tên</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-0 py-3 border-b outline-none transition-colors bg-transparent ${
                          isDarkMode ? "border-gray-700 focus:border-pink-500 text-white" : "border-pink-100 focus:border-[#ff4d8d]"
                        }`}
                        placeholder="Họ và tên của bạn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-0 py-3 border-b outline-none transition-colors bg-transparent ${
                          isDarkMode ? "border-gray-700 focus:border-pink-500 text-white" : "border-pink-100 focus:border-[#ff4d8d]"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Tiêu đề</label>
                    <input 
                      type="text" 
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-0 py-3 border-b outline-none transition-colors bg-transparent ${
                        isDarkMode ? "border-gray-700 focus:border-pink-500 text-white" : "border-pink-100 focus:border-[#ff4d8d]"
                      }`}
                      placeholder="Cơ hội hợp tác"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Lời nhắn</label>
                    <textarea 
                      rows={4}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-0 py-3 border-b outline-none transition-colors bg-transparent resize-none ${
                        isDarkMode ? "border-gray-700 focus:border-pink-500 text-white" : "border-pink-100 focus:border-[#ff4d8d]"
                      }`}
                      placeholder="Viết lời nhắn của bạn tại đây..."
                    />
                  </div>
                  
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-500 text-sm font-medium"
                      >
                        <CheckCircle2 size={16} />
                        Tin nhắn đã được gửi thành công!
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm font-medium"
                      >
                        <AlertCircle size={16} />
                        Có lỗi xảy ra. Vui lòng thử lại sau.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 bg-[#ff4d8d] text-white rounded-2xl font-bold hover:bg-[#e63e7a] transition-all mt-4 shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi tin nhắn"
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t px-6 transition-colors duration-500 ${
        isDarkMode ? "border-gray-800" : "border-pink-100"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © 2026 Nguyễn Thị Thùy Linh. 
          </p>

        </div>
      </footer>
    </div>
  );
}



