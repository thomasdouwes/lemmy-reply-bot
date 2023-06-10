import LemmyBot, { SortType } from 'lemmy-bot';
import { config } from 'dotenv';

config();
const { INSTANCE, USERNAME_OR_EMAIL, PASSWORD, REPLY_INSTANCE, REPLY_COMMUNITY, REPLY_REGEX, REPLY_TEXT } =
  process.env as Record<string, string>;

//very ugly .env checking
console.log("Running bot with variables:");
if(INSTANCE) { 
    console.log('Instance:', INSTANCE); 
}
else { 
    console.error('INSTANCE not set'); 
}
if(USERNAME_OR_EMAIL) { 
    console.log('Username:', USERNAME_OR_EMAIL); 
}
else { 
    console.error('USERNAME_OR_EMAIL not set'); 
}
if(PASSWORD) { 
    //console.log('Password:', PASSWORD);
    console.log('Password: Redacted')
}
else { 
    console.error('PASSWORD not set'); 
}
if(REPLY_INSTANCE) { 
    console.log('Reply instance:', REPLY_INSTANCE);
}
else { 
    console.error('REPLY_INSTANCE not set'); 
}
if(REPLY_COMMUNITY) { 
    console.log('Reply community:', REPLY_COMMUNITY);
}
else { 
    console.error('REPLY_COMMUNITY not set'); 
}
if(REPLY_REGEX) {
	var isValid = true;
	try {
	    //RegEx hell
	    var flags = REPLY_REGEX.replace(/.*\/([gimy]*)$/, '$1');
	    var pattern = REPLY_REGEX.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
	    var regex = new RegExp(pattern, flags);
	    console.log("Parsed RegEx:", regex);
	} catch(e) {
	    isValid = false;
	}

	if(!isValid) console.error("Invalid reply RegEx");
	console.log('Reply RegEx:', REPLY_REGEX);
}
else { 
    console.error('REPLY_REGEX not set'); 
}
if(REPLY_TEXT) { 
    console.log('Reply text:', REPLY_TEXT);
}
else { 
    console.error('REPLY_TEXT not set'); 
}

const bot = new LemmyBot({
  instance: INSTANCE,
  credentials: {
    username: USERNAME_OR_EMAIL,
    password: PASSWORD
  },
  connection: {
    minutesUntilReprocess: 10,
    secondsBetweenPolls: 10
  },
  federation: {
    allowList: [
      //you seem to need two instances or it will listen on everything.
      {
        instance: REPLY_INSTANCE,
        communities: [REPLY_COMMUNITY]
      },
      {
        instance: 'lemmy.douwes.co.uk',
      	communities: ['test']
      }
    ]
  },
  dbFile: 'db.sqlite3',
  handlers: {
    async comment ({
       commentView: { comment },
       botActions: { createComment, getUserId },
       preventReprocess
    }) {
      //get the user ID of the bot so it dosn't reply to itself
      const bot_id = await getUserId(USERNAME_OR_EMAIL);
      //console.log("Bot ID:", bot_id);
      //console.log("Comment creator ID:", comment.creator_id);
      console.log("Comment body:", comment.content);
      //console.log("RegEx:", regex);
        //sometimes getUserId returns undefined, don't reply to the comment incase it is the bots comment
      	if (comment.creator_id != bot_id && bot_id !== undefined) {
	  if (regex.test(comment.content)) {
	   console.log("comment matched RegEx, responding")	  
           createComment({
            postId: comment.post_id,
	    parentId: comment.id,
            content: REPLY_TEXT,
	  });
          preventReprocess();
	  }
	  else
          {
	    console.log("comment didn't match RegEx, not responding")
          }
	}
	else
	{
	  console.log("ignoring self comment");
	  //preventReprocess();
	}
    },
    async post ({
       postView: { post },
       botActions: { createComment, getUserId },
       preventReprocess
    }) {
	  console.log("Post Title:", post.name);
	  if (regex.test(post.body!) || regex.test(post.name)) {
	    console.log("post matched RegEx, responding")	  
              createComment({
               postId: post.id,
	       //parentId: comment.id,
               content: REPLY_TEXT,
	      });
            preventReprocess();
	  }
	  else
          {
	    console.log("post didn't match RegEx, not responding")
          }
    }
  }
});

bot.start()
