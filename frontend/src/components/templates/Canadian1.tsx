// for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
import React from "react";
import {
  Education,
  Experience,
  Language,
  Skill,
  User,
} from "../../utils/types";

type props = {
  person: User;
  education: Education;
  experience: Experience;
  skills: Skill[];
  language: Language[];
};
// const Canadian1 = (props: props) => {
const Canadian1 = () => {
  return (
    // for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
    <section className="text-start tracking-wide shadow-lg h-[1120px] w-[791px] p-6 bg-bg-light-1 text-font-light-1 rounded-lg">
      <div className="text-4xl tracking-widest py-4 text-start border border-0 border-b-2 border-gray-300">
        <span className="font-bold text-4xl">KOUHADI </span>
        BAKR
        <p className="text-xl mt-4">English Teacher</p>
      </div>

      <div className="grid grid-cols-5 py-4">
        {/* personal details + education + skills + languages */}
        <div className="col-span-2 flex flex-col gap-2 pr-4 gap-4">
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="font-bold">EMAIL</p>
              <p className="">email@email.com</p>
            </div>
            <div className="">
              <p className="font-bold">PHONE</p>
              <p className="">+212600000000</p>
            </div>
            <div className="">
              <p className="font-bold">NATIONALITY</p>
              <p className="">Moroccan</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="bg-bg-light-2 p-2 font-bold">EDUCATION</h1>
            <div className="text-sm">
              <p className="">
                <span className="font-bold">Master</span> degree in Education
                Literature
              </p>
              <p className="">University of Education.</p>
              <div className="flex items-center justify-between">
                <p className="">10-08-2021</p>
                <p className="">Beijing - China</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="">
                <span className="font-bold">TEFL</span> Certifcate in Teaching
                English as a foreign Language
              </p>
              <p className="">Via Lingua</p>
              <div className="flex items-center justify-between">
                <p className="">01-09-2012</p>
                <p className="">Marrakech - Morocco</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="">
                <span className="font-bold">Bachelor</span> degree in English
                Literature
              </p>
              <p className="">University of Chouaib Dokkali</p>
              <div className="flex items-center justify-between">
                <p className="">01-07-2016</p>
                <p className="">El Jadida - Morocco</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center px-2 h-10 bg-bg-light-2 ">
              <h1 className="font-bold ">SKILLS</h1>
            </div>
            <div className="">
              <div className="text-sm flex items-center justify-between py-1">
                <p className="font-bold ">Photoshop</p>
                <p>Proficient</p>
              </div>
              <div className="text-sm flex items-center justify-between py-1">
                <p className="font-bold ">Illustrator</p>
                <p>Elementary</p>
              </div>
              <div className="text-sm flex items-center justify-between py-1">
                <p className="font-bold ">After Effect</p>
                <p>Beiginner</p>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="bg-bg-light-2 p-2 font-bold">LANGUAGES</h1>
            <div className="text-sm flex items-center justify-between py-1">
              <p className="font-bold ">Arabic</p>
              <p>Native</p>
            </div>
            <div className="text-sm flex items-center justify-between py-1">
              <p className="font-bold">English</p>
              <p>Proficient</p>
            </div>
            <div className="text-sm flex items-center justify-between py-1">
              <p className="font-bold">French</p>
              <p>Elementary</p>
            </div>
          </div>
        </div>

        {/* personal description or summary + experience */}
        <div className="col-span-3 border border-0 border-l-2 border-gray-300 flex flex-col gap-2 pl-4 ">
          <div className="">
            <h1 className="bg-bg-light-2 p-2 font-bold">PERSONAL SUMMARY</h1>
            <p className="text-sm">
              I am a web developer with over 6 years of experience. I am from
              Morocco but I'm currently living and working in China. I started
              coding back in 2013, which is the time when I enrolled in IISGA
              institute to study computer science. I am particularly interested
              in Go, Typescript, Javascript, React Js, Next Js, and
              React-native, along with many of the libraries developed for this
              ecosystem.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="bg-bg-light-2 p-2 font-bold">
              PROFESSIONAL EXPERIENCE
            </h1>
            <div className="">
              <p className="font-bold">English Teacher - Hope more School</p>
              <div className="flex items-center justify-between text-sm">
                <p className="">Jan 2020 to Present</p>
                <p className="">Hohhot - China</p>
              </div>
              <p className="text-sm mt-2">
                I am a web developer with over 6 years of experience. I am from
                Morocco but I'm currently living and working in China. I started
                coding back in 2013, which is the time when I enrolled in IISGA
                institute to study computer science. I am particularly
                interested in Go, Typescript, Javascript, React Js, Next Js, and
                React-native, along with many of the libraries developed for
                this ecosystem.
              </p>
            </div>
            <div className="">
              <p className="font-bold">English Teacher - Hope more School</p>
              <div className="flex items-center justify-between text-sm">
                <p className="">Jan 2020 to Present</p>
                <p className="">Hohhot - China</p>
              </div>
              <p className="text-sm mt-2">
                I am a web developer with over 6 years of experience. I am from
                Morocco but I'm currently living and working in China. I started
                coding back in 2013, which is the time when I enrolled in IISGA
                institute to study computer science. I am particularly
                interested in Go, Typescript, Javascript, React Js, Next Js, and
                React-native, along with many of the libraries developed for
                this ecosystem.
              </p>
            </div>
            <div className="">
              <p className="font-bold">English Teacher - Hope more School</p>
              <div className="flex items-center justify-between text-sm">
                <p className="">Jan 2020 to Present</p>
                <p className="">Hohhot - China</p>
              </div>
              <p className="text-sm mt-2">
                I am a web developer with over 6 years of experience. I am from
                Morocco but I'm currently living and working in China. I started
                coding back in 2013, which is the time when I enrolled in IISGA
                institute to study computer science. I am particularly
                interested in Go, Typescript, Javascript, React Js, Next Js, and
                React-native, along with many of the libraries developed for
                this ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Canadian1;
