import './AboutProject.css';

function AboutProject() {
    return (
        <section className="project">
            <h2 className="project__title">О Проекте</h2>
            <div className="project__container">
                <div>
                    <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p  className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="project__progressbar">
                <div className="project__progressbar-container project__progressbar-container_type_backend">
                    <p className="project__progressbar-text project__progressbar-text_type_backend">1 неделя</p>
                    <span className="project__progressbar-span project__progressbar-span_type_backend">Back-end</span>
                </div>
                <div className="project__progressbar-container project__progressbar-container_type_frontend">
                    <p className="project__progressbar-text project__progressbar-text_type_frontend">4 недели</p>
                    <span className="project__progressbar-span project__progressbar-span_type_frontend">Front-end</span>
                </div>

            </div>
        </section>
    );
}

export default AboutProject;