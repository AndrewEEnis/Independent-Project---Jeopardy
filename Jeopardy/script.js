var categories = ['To write or record', 'To see or observe', 'Many', 'Other roots', 'Find the meaning'];
var questions = [
    [ // To write or record
        'A morpheme that means to write or record', // What is a graph or scribe?
        'A signature, especially by a famous person', // What is an autograph?
        'A 19th century communication device using Morse Code', // What is the telegraph?
        'A person who plans a dance routine', // What is a choreographer?
        'A person who copied documents before the printing press', // What is a scribe?
    ],
    [ // To see or observe
        'Morpheme that means to see or observe', // Vis
        'The recording of visual moving images', // Video
        'The 4 step process during which you make changes to improve structure, content, or organization', //Revision
        'Facts presented in a court case to prove innocence or guilt', // Evidence
        'A person with original ideas about what the future could be like, often related to dreams or the supernatural' // Visionary
    ],
    [ // Many
       'A root meaning many or more than one', //Poly or Multi
       'A person with more than one million dollars', // Multimillionaire
       'In math, a figure with at least 3 straight sides', // Polygon
       'A fabric made with many synthetic resins and fibers', // Polyester
       'In math, when you use addition many times', //Multiplication
    ],
    [ // Other roots
        'The study of life', //Biology
        'An insect with 100 feet', //Centipede
        'A device invented in late 1800s to hear from far away by Alexander Graham Bell', //Telephone
        "A story about someone's life written by themself", //Autobiography
        "A task that is dull or repetitive", // Monotonous
    ],
    [ // Find the meaning
        "To oversee, Above", // Supervise
        "Field of study, Earth, The study of Earth", //Geology
        "Many jobs or tasks, Doing many things at once", //Multitask
        "Water, relating to something in the shape of a ball or the earth", // Hydrosphere
        "Far away, to see, state of action or ability to see something from far away", //Television
    ]
];
var teams = [
    ['Team 1', 0],
    ['Team 2', 0],
];
var currentTeam = 0;

function setupBoard() {
    for (var i = 0; i < categories.length; i++) {
        var col = document.createElement('div');
        col.className = 'col-sm text-center';
        var card = document.createElement('div');
        card.className = 'card';

        var cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        var header = document.createElement('h2');
        var headerText = document.createTextNode(categories[i]);
        header.appendChild(headerText);

        var list = document.createElement('ul');
        list.className = 'list-group list-group-flush';
        for (var j = 0; j < questions[i].length; j++) {
            var link = document.createElement('a');
            link.setAttribute('href', '');
            link.setAttribute('data-toggle','modal');
            link.setAttribute('data-target', '#questionModal');
            link.setAttribute('data-category', i.toString())
            link.setAttribute('data-money', ((j+1)*100).toString());
            link.setAttribute('data-questionid', j.toString());
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            var amount = document.createTextNode('$' + (j+1)*100);
            listItem.appendChild(amount);
            
            list.append(link);
            link.append(listItem);
        }

        $('#gameBoard').append(col);
        col.append(card);
        card.append(cardHeader);
        cardHeader.append(header);
        card.append(list);
    }
}

function incrementTeam() {
    console.log(teams.length)
    if (currentTeam < teams.length-1) {
        currentTeam++;
    } else {
        currentTeam = 0;
    }
}

function whosTurnIsIt() {
    $('#teamTurn').text(teams[currentTeam][0] + ' is up!');
}

function setScoreboard() {
    $('#scoreboard').empty();
    teams.forEach(function(team) {
        var s = '<p>' + team[0] + ': $' + team[1] + '</p>';
        $('#scoreboard').append(s);
    });
}

function nextQuestion() {
    incrementTeam();
    console.log("Current Team " + currentTeam);
    $('#questionModal').modal('hide');
    whosTurnIsIt();
    setScoreboard();
}

$(document).ready(function() {
    var category = '';
    var money = '';
    var questionid = '';

    setupBoard();
    whosTurnIsIt();
    setScoreboard();

    $('a').click(function() {
        $(this).addClass('isDisabled');
        $(this).children().addClass('disabled');
    });

    $('#questionModal').on('shown.bs.modal', function(event) {
        var link = $(event.relatedTarget);
        category = link.data('category');
        money = link.data('money');
        questionid = link.data('questionid');
    
        var modal = $(this);
        modal.find('.modal-title').text(categories[category] + ' for $' + money);
        modal.find('.modal-body p').text(questions[category][questionid]);
    });

    $('#correct').click(function() {
        teams[currentTeam][1] += parseInt(money);
        nextQuestion();
    });

    $('#incorrect').click(function() {
        teams[currentTeam][1] -= parseInt(money);
        nextQuestion();
    });
});