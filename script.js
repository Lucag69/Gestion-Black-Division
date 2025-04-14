// Grades disponibles
const grades = [
    "Agent", "Agent de Surveillance", "Chef de Groupe", "Inspecteur", "Inspecteur Principal", 
    "Chef Inspecteur", "Commandant", "Chef de Commandement", "Directeur", "Directeur Adjoint"
];

// Fonction pour enregistrer les agents et les utilisateurs dans le stockage local
function loadAgents() {
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = '';
    agents.forEach((agent, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${agent.name} - ${agent.grade} 
        <button class="modify" onclick="modifyAgent(${index})">Modifier</button>
        <button class="delete" onclick="deleteAgent(${index})">Supprimer</button>`;
        agentList.appendChild(li);
    });
}

// Ajouter un agent
document.getElementById('addAgentBtn').addEventListener('click', function() {
    const name = prompt('Nom de l\'agent:');
    const grade = prompt('Grade de l\'agent:');
    
    // Menu déroulant pour le grade
    const gradeSelect = document.createElement('select');
    grades.forEach(gradeOption => {
        const option = document.createElement('option');
        option.value = gradeOption;
        option.text = gradeOption;
        gradeSelect.appendChild(option);
    });

    const agentForm = document.createElement('form');
    agentForm.appendChild(document.createTextNode('Choisir un grade:'));
    agentForm.appendChild(gradeSelect);
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Ajouter';
    agentForm.appendChild(submitButton);

    document.body.appendChild(agentForm);

    submitButton.addEventListener('click', function() {
        const selectedGrade = gradeSelect.value;
        const agents = JSON.parse(localStorage.getItem('agents')) || [];
        agents.push({ name, grade: selectedGrade });
        localStorage.setItem('agents', JSON.stringify(agents));
        loadAgents();
        document.body.removeChild(agentForm); // Ferme le formulaire après ajout
    });
});

// Supprimer un agent
function deleteAgent(index) {
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    agents.splice(index, 1);
    localStorage.setItem('agents', JSON.stringify(agents));
    loadAgents();
}

// Modifier un agent (changement du nom et du grade)
function modifyAgent(index) {
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    const agent = agents[index];
    
    const newName = prompt('Nouveau nom de l\'agent:', agent.name);
    
    // Menu déroulant pour le grade
    const gradeSelect = document.createElement('select');
    grades.forEach(gradeOption => {
        const option = document.createElement('option');
        option.value = gradeOption;
        option.text = gradeOption;
        gradeSelect.appendChild(option);
    });
    
    const agentForm = document.createElement('form');
    agentForm.appendChild(document.createTextNode('Choisir un nouveau grade:'));
    agentForm.appendChild(gradeSelect);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Modifier';
    agentForm.appendChild(submitButton);
    
    document.body.appendChild(agentForm);

    submitButton.addEventListener('click', function() {
        const selectedGrade = gradeSelect.value;
        if (newName && selectedGrade) {
            agents[index] = { name: newName, grade: selectedGrade };
            localStorage.setItem('agents', JSON.stringify(agents));
            loadAgents();
            document.body.removeChild(agentForm); // Ferme le formulaire après modification
        }
    });
}

// Fonction pour créer un nouveau compte
document.getElementById('createAccountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newID = document.getElementById('newID').value;
    const newPassword = document.getElementById('newPassword').value;

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push({ id: newID, password: newPassword });
    localStorage.setItem('accounts', JSON.stringify(accounts));

    alert("Compte créé avec succès !");
    document.getElementById('newID').value = '';
    document.getElementById('newPassword').value = '';
});

// Fonction pour gérer la connexion
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('loginID').value;
    const password = document.getElementById('loginPassword').value;

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = accounts.find(account => account.id === id && account.password === password);

    if (user) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminSection').style.display = 'block';
        loadAgents();
        addLogoutButton();
    } else {
        document.getElementById('loginError').textContent = "ID ou mot de passe incorrect.";
    }
});

// Ajouter un bouton de déconnexion
function addLogoutButton() {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        document.getElementById('adminSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });
}

// Charger les agents dès que la page est ouverte
loadAgents();
// Fonction pour afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.borderRadius = '5px';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Fonction pour basculer entre mode sombre et mode clair
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);

// Fonction pour rechercher un agent
document.getElementById('searchAgent').addEventListener('input', function(e) {
    const searchQuery = e.target.value.toLowerCase();
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    const filteredAgents = agents.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery) || 
        agent.grade.toLowerCase().includes(searchQuery)
    );
    displayAgents(filteredAgents);
});

function displayAgents(agents) {
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = '';
    agents.forEach((agent, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${agent.name} - ${agent.grade} 
        <button class="modify" onclick="modifyAgent(${index})">Modifier</button>
        <button class="delete" onclick="deleteAgent(${index})">Supprimer</button>`;
        agentList.appendChild(li);
    });
}

// Ajouter un agent avec photo
function addAgentWithPhoto() {
    const name = prompt('Nom de l\'agent:');
    const grade = prompt('Grade de l\'agent:');
    const photoURL = prompt('URL de la photo de profil de l\'agent (facultatif):');
    
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    agents.push({ name, grade, photoURL });
    localStorage.setItem('agents', JSON.stringify(agents));
    loadAgents();
}

// Charger les agents
function loadAgents() {
    const agents = JSON.parse(localStorage.getItem('agents')) || [];
    const agentList = document.getElementById('agentList');
    agentList.innerHTML = '';
    agents.forEach((agent, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${agent.name} - ${agent.grade} 
        <button class="modify" onclick="modifyAgent(${index})">Modifier</button>
        <button class="delete" onclick="deleteAgent(${index})">Supprimer</button>`;
        agentList.appendChild(li);
    });
}
let users = [
    { id: "Luca", password: "Rugby123!", permissions: ["admin"] }
];

