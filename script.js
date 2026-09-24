/* =========================================================
   LE CENTRALIEN
   JavaScript
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

// Mets ici ton vrai lien Jotform.
// Exemple :
// const JOTFORM_URL = "https://form.jotform.com/XXXXXXXXXXXXXXX";

const JOTFORM_URL = "";


/* =========================================================
   HORAIRES
   =========================================================
   
   Pour le moment, les créneaux sont indiqués "À définir"
   car les horaires exacts n'ont pas encore été fournis.

   Il suffira de remplacer :

   "À définir"

   par exemple par :

   "Lundi — 17h00 à 19h00"

   ou plusieurs créneaux :

   [
       "Lundi — 17h00 à 19h00",
       "Samedi — 09h00 à 11h00"
   ]

   ========================================================= */

const scheduleData = {

    mathematiques: {
        title: "Mathématiques",

        description:
            "Retrouvez les encadreurs proposant des séances de mathématiques.",

        teachers: [
            {
                name: "Ivan",
                initials: "IV",
                slots: ["À définir"]
            },

            {
                name: "Alfred",
                initials: "AL",
                slots: ["À définir"]
            },

            {
                name: "Boubacar",
                initials: "BO",
                slots: ["À définir"]
            }
        ]
    },


    physique: {
        title: "Physique",

        description:
            "Retrouvez les encadreurs proposant des séances de physique.",

        teachers: [
            {
                name: "Ivan",
                initials: "IV",
                slots: ["À définir"]
            },

            {
                name: "Alfred",
                initials: "AL",
                slots: ["À définir"]
            },

            {
                name: "Boubacar",
                initials: "BO",
                slots: ["À définir"]
            }
        ]
    },


    chimie: {
        title: "Chimie",

        description:
            "Retrouvez les encadreurs proposant des séances de chimie.",

        teachers: [
            {
                name: "Ivan",
                initials: "IV",
                slots: ["À définir"]
            },

            {
                name: "Alfred",
                initials: "AL",
                slots: ["À définir"]
            },

            {
                name: "Boubacar",
                initials: "BO",
                slots: ["À définir"]
            }
        ]
    },


    francais: {
        title: "Français",

        description:
            "Les informations concernant l'encadrement du français seront ajoutées prochainement.",

        teachers: []
    },


    anglais: {
        title: "Anglais",

        description:
            "Retrouvez l'encadreur proposant des séances d'anglais.",

        teachers: [
            {
                name: "Boubacar",
                initials: "BO",
                slots: ["À définir"]
            }
        ]
    },


    informatique: {
        title: "Informatique",

        description:
            "Retrouvez les encadreurs proposant des séances d'informatique.",

        teachers: [
            {
                name: "Ivan",
                initials: "IV",
                slots: ["À définir"]
            },

            {
                name: "Alfred",
                initials: "AL",
                slots: ["À définir"]
            }
        ]
    }

};


/* =========================================================
   HEADER
   ========================================================= */

const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");


mobileMenuButton.addEventListener("click", () => {

    const isOpen =
        mainNav.classList.toggle("open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/*
   Fermer le menu mobile lorsqu'on clique
   sur un lien.
*/

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   NAVIGATION ACTIVE
   ========================================================= */

const sections =
    document.querySelectorAll("main section[id]");


const updateActiveNavigation = () => {

    let currentSection = "accueil";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

};


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   MODAL HORAIRES
   ========================================================= */

const scheduleModal =
    document.getElementById("scheduleModal");

const closeScheduleModal =
    document.getElementById("closeScheduleModal");

const scheduleModalTitle =
    document.getElementById("scheduleModalTitle");

const scheduleModalDescription =
    document.getElementById(
        "scheduleModalDescription"
    );

const scheduleList =
    document.getElementById("scheduleList");


/*
   Fonction pour ouvrir le modal
*/

function openScheduleModal(courseKey) {

    const course =
        scheduleData[courseKey];

    if (!course) {
        return;
    }


    /*
       Titre
    */

    scheduleModalTitle.textContent =
        course.title;


    /*
       Description
    */

    scheduleModalDescription.textContent =
        course.description;


    /*
       Nettoyer la liste
    */

    scheduleList.innerHTML = "";


    /*
       Aucun encadreur
    */

    if (course.teachers.length === 0) {

        const emptyMessage =
            document.createElement("div");

        emptyMessage.className =
            "schedule-empty";

        emptyMessage.textContent =
            "Les informations concernant les encadreurs et les horaires seront ajoutées prochainement.";

        scheduleList.appendChild(
            emptyMessage
        );

    }


    /*
       Afficher les encadreurs
    */

    course.teachers.forEach((teacher) => {

        const row =
            document.createElement("div");

        row.className =
            "schedule-row";


        /*
           Partie encadreur
        */

        const teacherContainer =
            document.createElement("div");

        teacherContainer.className =
            "schedule-teacher";


        const avatar =
            document.createElement("div");

        avatar.className =
            "schedule-avatar";

        avatar.textContent =
            teacher.initials;


        const teacherInfo =
            document.createElement("div");

        teacherInfo.className =
            "schedule-teacher-info";


        const teacherName =
            document.createElement("strong");

        teacherName.textContent =
            teacher.name;


        const teacherLabel =
            document.createElement("span");

        teacherLabel.textContent =
            "Encadreur";


        teacherInfo.appendChild(
            teacherName
        );

        teacherInfo.appendChild(
            teacherLabel
        );


        teacherContainer.appendChild(
            avatar
        );

        teacherContainer.appendChild(
            teacherInfo
        );


        /*
           Créneaux
        */

        const slotsContainer =
            document.createElement("div");

        slotsContainer.className =
            "schedule-slots";


        teacher.slots.forEach((slot) => {

            const slotElement =
                document.createElement("span");

            slotElement.className =
                "schedule-slot";


            if (slot === "À définir") {

                slotElement.classList.add(
                    "pending"
                );

            }


            slotElement.textContent =
                slot;


            slotsContainer.appendChild(
                slotElement
            );

        });


        row.appendChild(
            teacherContainer
        );

        row.appendChild(
            slotsContainer
        );


        scheduleList.appendChild(row);

    });


    /*
       Afficher modal
    */

    scheduleModal.classList.add("open");

    scheduleModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    /*
       Mettre le focus sur le bouton fermer
    */

    setTimeout(() => {

        closeScheduleModal.focus();

    }, 100);

}


/*
   Boutons "Découvrir les horaires"
*/

const courseButtons =
    document.querySelectorAll(
        ".course-discover"
    );


courseButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const courseKey =
            button.dataset.course;

        openScheduleModal(courseKey);

    });

});


/*
   Fonction fermeture
*/

function closeScheduleModalFunction() {

    scheduleModal.classList.remove(
        "open"
    );

    scheduleModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/*
   Bouton fermer
*/

closeScheduleModal.addEventListener(
    "click",
    closeScheduleModalFunction
);


/*
   Cliquer sur le fond
*/

const modalBackdrop =
    document.querySelector(
        "[data-close-modal]"
    );


modalBackdrop.addEventListener(
    "click",
    closeScheduleModalFunction
);


/*
   Touche Escape
*/

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        scheduleModal.classList.contains("open")
    ) {

        closeScheduleModalFunction();

    }

});


/* =========================================================
   LIEN JOTFORM
   ========================================================= */

const jotformButton =
    document.getElementById(
        "jotformButton"
    );


if (JOTFORM_URL.trim() !== "") {

    jotformButton.href =
        JOTFORM_URL;

} else {

    jotformButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            alert(
                "Le lien Jotform n'a pas encore été configuré."
            );

        }
    );

}


/* =========================================================
   MODAL → RESERVATION
   ========================================================= */

const modalReservation =
    document.querySelector(
        ".modal-reservation"
    );


modalReservation.addEventListener(
    "click",
    () => {

        closeScheduleModalFunction();

    }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    (event) => {

        const name =
            document.getElementById(
                "name"
            ).value.trim();


        /*
           Vérification du nom.

           Si le nom est vide, on bloque
           l'envoi vers Web3Forms.
        */

        if (!name) {

            event.preventDefault();

            formMessage.textContent =
                "Veuillez renseigner votre nom.";

            formMessage.style.color =
                "#c0392b";

            return;

        }


        /*
           Si le nom est renseigné,
           on laisse le formulaire continuer
           normalement vers Web3Forms.
        */

        formMessage.textContent =
            "Envoi de votre message...";

        formMessage.style.color =
            "#1557a6";

    }
);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   FIN
   ========================================================= */

console.log(
    "Le Centralien — site chargé avec succès."
);