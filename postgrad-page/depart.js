import phy from './src/assets/depart/phy.png'
import maths from './src/assets/depart/maths.png'
import geo from './src/assets/depart/geo.jpg'
import envir from './src/assets/depart/envir.jpg'
import comp from './src/assets/depart/comp.png'
import chem from './src/assets/depart/chem.jpg'
import bio from './src/assets/depart/bio.png'




const DepartData = [
  
            {
                id: 1,
                faculty: "Faculty of Science",
                Departments:[{
                    name: "Department of Physics",
                     description: "Study of matter and energy", image: phy
                     
                },

                      {name: "Department of Chemistry", description: "Study of substances and their properties", image: chem},

                     {name: "Department of Biology", description: "Study of living organisms", image:bio },
                      {name: "Department of Mathematics", description: "Study of numbers and patterns", image:maths },
                      {name: "Department of Computer Science", description: "Study of computation and information systems", image: comp},
                       {name: "Department of Environmental Science", description: "Study of the environment and ecosystems", image: envir},
                    {name: "Department of Geology", description: "Study of the Earth and its processes", image: geo}]
                      
            },
            {
                id: 2,
                faculty: "Faculty of Arts",
                Departments:[{name: "Department of History", description: "Study of past events", image: "https://example.com/history.jpg"}, 
                    {name: "Department of Literature", description: "Study of written works", image: "https://example.com/literature.jpg"}, 
                    {name: "Department of Philosophy", description: "Study of fundamental questions", image: "https://example.com/philosophy.jpg"},
                {name: "Department of Fine Arts", description: "Study of visual and performing arts", image: "https://example.com/finearts.jpg"}, 
                {name: "Department of Music", description: "Study of musical composition and performance", image: "https://example.com/music.jpg"},
                 {name: "Department of Theatre Arts", description: "Study of dramatic arts and performance", image: "https://example.com/theatre.jpg"},
                {name: "Department of Linguistics", description: "Study of language and its structure", image: "https://example.com/linguistics.jpg"}]
            },
            {
                id: 3,
                faculty: "Faculty of Social Sciences",
                Departments:[{name: "Department of Sociology", description: "Study of society and social behavior", image: "https://example.com/sociology.jpg"}, 
                    {name: "Department of Psychology", description: "Study of the mind and behavior", image: "https://example.com/psychology.jpg"}, 
                    {name: "Department of Political Science", description: "Study of government and politics", image: "https://example.com/politicalscience.jpg"},
                    {name: "Department of Economics", description: "Study of production, distribution, and consumption", image: "https://example.com/economics.jpg"},
                {name: "Department of Geography", description: "Study of the Earth's landscapes and environments", image: "https://example.com/geography.jpg"},
                 {name: "Department of Anthropology", description: "Study of human societies and cultures", image: "https://example.com/anthropology.jpg"},]
            },
            {
                id: 4,
                faculty: "Faculty of Engineering",
                Departments:[{name: "Department of Civil Engineering", description: "Design and construction of infrastructure", image: "https://example.com/civilengineering.jpg"}, 
                    {name: "Department of Mechanical Engineering", description: "Study of machines and mechanical systems", image: "https://example.com/mechanicalengineering.jpg"}, 
                    {name: "Department of Electrical Engineering", description: "Study of electrical systems and electronics", image: "https://example.com/electricalengineering.jpg"},
                    {name: "Department of Chemical Engineering", description: "Study of chemical processes and materials", image: "https://example.com/chemicalengineering.jpg"},
                {name: "Department of Computer Engineering", description: "Study of computer systems and hardware", image: "https://example.com/computerengineering.jpg"},
                 {name: "Department of Environmental Engineering", description: "Study of environmental protection and sustainability", image: "https://example.com/environmentalengineering.jpg"},
                    {name: "Department of Petroleum Engineering", description: "Study of oil and gas extraction and production", image: "https://example.com/petroleumengineering.jpg"}]
            },      
            {
                id: 5,
                faculty: "Faculty of Medicine",
                Departments:[{name: "Department of Anatomy", description: "Study of human body structure", image: "https://example.com/anatomy.jpg"}, 
                    {name: "Department of Physiology", description: "Study of bodily functions", image: "https://example.com/physiology.jpg"}, 
                    {name: "Department of Biochemistry", description: "Study of chemical processes in living organisms", image: "https://example.com/biochemistry.jpg"},
                    {name: "Department of Pharmacology", description: "Study of drug action and effects", image: "https://example.com/pharmacology.jpg"},
                    {name: "Department of Microbiology", description: "Study of microorganisms and their effects on health", image: "https://example.com/microbiology.jpg"},
                    {name: "Department of Pathology", description: "Study of disease processes", image: "https://example.com/pathology.jpg"},
                    {name: "Department of Community Medicine", description: "Study of public health and preventive medicine", image: "https://example.com/communitymedicine.jpg"}]
            },  
            {
                id: 6,
                faculty: "Faculty of Law",
                Departments:[{name: "Department of Constitutional Law", description: "Study of constitutional principles", image: "https://example.com/constitutionallaw.jpg"}, 
                    {name: "Department of Criminal Law", description: "Study of criminal justice and law enforcement", image: "https://example.com/criminallaw.jpg"}, 
                    {name: "Department of International Law", description: "Study of international legal systems", image: "https://example.com/internationallaw.jpg"},
                    {name: "Department of Commercial Law", description: "Study of business and trade laws", image: "https://example.com/commerciallaw.jpg"}, {name: "Department of Human Rights Law", description: "Study of human rights and social justice", image: "https://example.com/humanrightslaw.jpg"},
                    {name: "Department of Environmental Law", description: "Study of environmental regulations and policies ", image: "https://example.com/environmentallaw.jpg"},
                    {name: "Department of Intellectual Property Law", description: "Study of intellectual property rights", image: "https://example.com/intellectualpropertylaw.jpg"}]
            }
            // Add more faculties and departments as needed
]

export default DepartData;