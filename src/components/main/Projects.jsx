// /src/components/main/projects
import ProjectCard from "../sub/ProjectCard";
import i18next from "../utils/i18n";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        {i18next.t("Projects.ourProjects")}
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/NextWebsite.png"
          title={i18next.t('Projects.ModernNextPortfolio')}
          description={i18next.t('Projects.Des4Modern')}
        />
        <ProjectCard
          src="/CardImage.png"
          title={i18next.t('Projects.InteractiveWebsiteCards')}
          description={i18next.t('Projects.Des4Interactive')}
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title={i18next.t('Projects.SpaceThemed')}
          description={i18next.t('Projects.Des4SpaceThemed')}
        />
      </div>
    </div>
  );
};

export default Projects;
