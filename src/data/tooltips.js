export class Tooltips {
    _makeVSEditorHappy = "";        // somehow the vs editor doesn't like the first field declaration
    data = [{
        type: "Overview",
        tips: [{
            select: ".navbar",
            title: "Welcome to Hackathon Planner!",
            content: "These tips are designed to help you get up and running in seconds and then they'll get out of the way. Click on the tooltips to move forward.",
            placement: "bottom"
        }, {
                select: "button",
                title: "Add new Hackathon Idea",
                content: "Click this button to add a new idea of your own. You can add as many ideas as you like.",
                placement: "bottom"
            }, {
                select: "div.card:first .card-text",
                title: "Title and Overview",
                content: "Every Hackathon idea has a title and a quick overview",
                placement: "bottom"
            }, {
                select: "div.card:first .team-count",
                title: "Joining a Team",
                content: "If you want to join a team, just click on this plus button. You can always change your mind later.",
                placement: "right"
            }, {
                select: "div.card:first i:last",
                title: "Like an Idea",
                content: "Hackathon Projects need likes. Only if they get enough likes, the project owner will be able to pitch the idea on the Hackathon day. So if you like a project idea, do not hesitate to like it!",
                placement: "bottom"
            }]
    },
        {
            type: "NewCard",
            tips: [{
                select: "#new-card input.card-title",
                title: "Project Title",
                content: "Please make sure you add a project title that is concise and clear.",
                placement: "bottom"
            }, {
                    select: "#new-card textarea.card-overview",
                    title: "Project Overview",
                    content: "Overview is displayed directly on the hackathon idea cards and they can't be longer than 300 chars. You'll also get a chance to write a longer description for your project so make sure the overview doesn't go into too many details.",
                    placement: "bottom"
                }]
        },
        {
            type: "IdeaCardDetail",
            tips: [{
                select: "h2.card-title",
                title: "Double Click",
                content: "For any idea that you've created, double clicking a certain field will enable editing on that field.",
                placement: "top"
            },
                {
                    select: "div.card-text",
                    title: "Project Description in MarkDown",
                    content: "Project description is where the Hackathon Projects are discussed in depth. Make sure you use the full power of mark down.",
                    placement: "top"
                }]
        }];
}