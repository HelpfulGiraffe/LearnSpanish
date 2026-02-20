import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "starters", label: "👋 Starters", color: "orange",
    phrases: [
      { en: "Hello! How are you?", es: "¡Hola! ¿Cómo estás?", note: "Use with friends/colleagues", response: { en: "I'm well, thank you! And you?", es: "¡Estoy bien, gracias! ¿Y tú?" } },
      { en: "Hello! How are you? (formal)", es: "¡Hola! ¿Cómo está usted?", note: "Use with someone you respect", response: { en: "Very well, thank you very much.", es: "Muy bien, muchas gracias." } },
      { en: "Good morning!", es: "¡Buenos días!", note: "Until around midday", response: { en: "Good morning! How are you?", es: "¡Buenos días! ¿Cómo estás?" } },
      { en: "Good afternoon!", es: "¡Buenas tardes!", note: "Midday to evening", response: { en: "Good afternoon! Everything good?", es: "¡Buenas tardes! ¿Todo bien?" } },
      { en: "Good evening / night!", es: "¡Buenas noches!", note: "Evening onwards", response: { en: "Good night! See you tomorrow.", es: "¡Buenas noches! Hasta mañana." } },
      { en: "What is your name?", es: "¿Cómo te llamas?", note: "Literally: How do you call yourself?", response: { en: "My name is... And you?", es: "Me llamo... ¿Y tú?" } },
      { en: "My name is...", es: "Me llamo... / Mi nombre es...", note: "Both are commonly used", response: { en: "Nice to meet you!", es: "¡Mucho gusto!" } },
      { en: "Nice to meet you!", es: "¡Mucho gusto!", note: "Very common across Latin America", response: { en: "Likewise! The pleasure is mine.", es: "¡Igualmente! El gusto es mío." } },
      { en: "How is everything?", es: "¿Cómo está todo?", note: "Casual check-in", response: { en: "All good, thanks! And with you?", es: "Todo bien, ¡gracias! ¿Y contigo?" } },
      { en: "What are you doing?", es: "¿Qué estás haciendo?", note: "Casual conversation opener", response: { en: "Not much, just working. And you?", es: "Nada, solo trabajando. ¿Y tú?" } },
      { en: "Where are you from?", es: "¿De dónde eres?", note: "Getting to know someone", response: { en: "I'm from Mexico. And you?", es: "Soy de México. ¿Y tú?" } },
      { en: "I am from England", es: "Soy de Inglaterra", note: "Tell them about you", response: { en: "Oh really? How interesting!", es: "¿Ah sí? ¡Qué interesante!" } },
      { en: "Do you speak English?", es: "¿Hablas inglés?", note: "Useful to know!", response: { en: "A little. I prefer Spanish!", es: "Un poco. ¡Prefiero el español!" } },
      { en: "I speak a little Spanish", es: "Hablo un poco de español", note: "They'll appreciate the effort", response: { en: "That's great! You speak it very well.", es: "¡Qué bueno! Lo hablas muy bien." } },
      { en: "Long time no see!", es: "¡Cuánto tiempo sin verte!", note: "Great when seeing someone after a while", response: { en: "I know! We must catch up properly!", es: "¡Ya sé! Tenemos que ponernos al día." } },
    ],
  },
  {
    id: "answers", label: "✅ Answers", color: "green",
    phrases: [
      { en: "Yes / No", es: "Sí. / No.", note: "The basics!", response: { en: "OK, understood!", es: "¡Bueno, entendido!" } },
      { en: "I am well, thank you", es: "Estoy bien, gracias", note: "Standard positive reply", response: { en: "Glad to hear it!", es: "¡Me alegra escuchar eso!" } },
      { en: "Very well!", es: "¡Muy bien!", note: "Enthusiastic reply", response: { en: "Great! That makes me happy.", es: "¡Qué bueno! Eso me alegra." } },
      { en: "Not bad / So-so", es: "Más o menos. / Regular.", note: "'Regular' is very Latin American for so-so", response: { en: "I hope it gets better!", es: "¡Espero que mejore!" } },
      { en: "I don't know", es: "No sé", note: "Super useful", response: { en: "No worries, I'll find out.", es: "No te preocupes, yo averiguo." } },
      { en: "I understand", es: "Entiendo", note: "Show you're following", response: { en: "Perfect! Any questions?", es: "¡Perfecto! ¿Alguna pregunta?" } },
      { en: "I don't understand", es: "No entiendo", note: "Don't be afraid to use this!", response: { en: "No problem, I'll explain again.", es: "No hay problema, te explico de nuevo." } },
      { en: "Can you repeat that?", es: "¿Puedes repetir eso?", note: "Ask them to say it again", response: { en: "Of course! I said...", es: "¡Claro! Dije..." } },
      { en: "More slowly please", es: "Más despacio, por favor", note: "They'll slow down for you", response: { en: "Sorry! Is this better?", es: "¡Perdón! ¿Así está mejor?" } },
      { en: "Of course!", es: "¡Claro! / ¡Claro que sí!", note: "Very common positive answer", response: { en: "Thank you so much!", es: "¡Muchas gracias!" } },
      { en: "OK / Alright", es: "Bien. / Bueno. / Está bien.", note: "All used interchangeably", response: { en: "Great, let's go!", es: "¡Perfecto, vamos!" } },
      { en: "I think so", es: "Creo que sí", note: "Agreeing with uncertainty", response: { en: "Let's check to be sure.", es: "Vamos a verificar para estar seguros." } },
      { en: "I don't think so", es: "Creo que no", note: "Polite disagreement", response: { en: "OK, let me check.", es: "Bueno, déjame revisar." } },
      { en: "That's right / Correct", es: "Correcto. / Así es.", note: "Confirming something", response: { en: "Great, we agree then!", es: "¡Perfecto, entonces estamos de acuerdo!" } },
      { en: "Whatever you prefer!", es: "¡Lo que tú prefieras!", note: "Flexible and easy-going response", response: { en: "OK, let's do it this way then.", es: "Bueno, entonces lo hacemos así." } },
    ],
  },
  {
    id: "what", label: "❓ What", color: "pink",
    phrases: [
      { en: "What is this?", es: "¿Qué es esto?", note: "Point at something and ask!", response: { en: "It's a... Do you want to try it?", es: "Es un... ¿Quieres probarlo?" } },
      { en: "What is that?", es: "¿Qué es eso?", note: "Further away object", response: { en: "That's a... It's very typical here.", es: "Eso es un... Es muy típico aquí." } },
      { en: "What do you want?", es: "¿Qué quieres?", note: "Asking someone's preference", response: { en: "I'd like a coffee please.", es: "Quisiera un café, por favor." } },
      { en: "What do you need?", es: "¿Qué necesitas?", note: "Offering help", response: { en: "Could you help me with this?", es: "¿Me puedes ayudar con esto?" } },
      { en: "What do you think?", es: "¿Qué piensas? / ¿Qué te parece?", note: "Asking for an opinion", response: { en: "I think it's a great idea!", es: "¡Me parece una gran idea!" } },
      { en: "What do you do for work?", es: "¿A qué te dedicas?", note: "More natural than 'qué trabajas'", response: { en: "I work in... And you?", es: "Trabajo en... ¿Y tú?" } },
      { en: "What time is it?", es: "¿Qué hora es?", note: "Essential everyday question", response: { en: "It's two thirty.", es: "Son las dos y media." } },
      { en: "What do you want to eat?", es: "¿Qué quieres comer?", note: "At lunch!", response: { en: "I fancy tacos today!", es: "¡Hoy me apetecen unos tacos!" } },
      { en: "What is your favourite food?", es: "¿Cuál es tu comida favorita?", note: "Great small talk", response: { en: "I love tamales! And you?", es: "¡Me encantan los tamales! ¿Y a ti?" } },
      { en: "What happened?", es: "¿Qué pasó?", note: "When something goes on", response: { en: "Nothing serious, everything is fine.", es: "Nada grave, todo está bien." } },
      { en: "What's new?", es: "¿Qué hay de nuevo? / ¿Qué cuentas?", note: "'Qué cuentas' is very Latin American", response: { en: "Not much! Same as always.", es: "¡Nada! Lo mismo de siempre." } },
      { en: "What are you up to today?", es: "¿Qué tienes planeado hoy?", note: "Casual question for the day ahead", response: { en: "Not much, just errands. And you?", es: "Nada, solo mandados. ¿Y tú?" } },
      { en: "What would you recommend?", es: "¿Qué me recomiendas?", note: "Great at restaurants or asking for advice", response: { en: "The chicken here is amazing!", es: "¡El pollo aquí está increíble!" } },
      { en: "What does that mean?", es: "¿Qué significa eso?", note: "When you hear an unfamiliar word", response: { en: "It means... it's very common here.", es: "Significa... es muy común aquí." } },
      { en: "What are your plans for the holidays?", es: "¿Qué planes tienes para las fiestas?", note: "Great around Christmas or long weekends", response: { en: "We're going to visit family in the south!", es: "¡Vamos a visitar familia en el sur!" } },
    ],
  },
  {
    id: "how", label: "🤔 How", color: "blue",
    phrases: [
      { en: "How are you?", es: "¿Cómo estás?", note: "Most common how question", response: { en: "Great thanks! And you?", es: "¡Muy bien gracias! ¿Y tú?" } },
      { en: "How do you say...?", es: "¿Cómo se dice...?", note: "Ask for a word in Spanish", response: { en: "You say it like this...", es: "Se dice así..." } },
      { en: "How much does it cost?", es: "¿Cuánto cuesta?", note: "Shopping / food", response: { en: "It costs fifty pesos.", es: "Cuesta cincuenta pesos." } },
      { en: "How many are there?", es: "¿Cuántos hay?", note: "Asking about quantity", response: { en: "There are about ten left.", es: "Quedan como diez." } },
      { en: "How do you do it?", es: "¿Cómo se hace?", note: "Asking for method", response: { en: "It's easy, I'll show you!", es: "¡Es fácil, te muestro!" } },
      { en: "How long does it take?", es: "¿Cuánto tiempo tarda?", note: "Time related", response: { en: "About twenty minutes.", es: "Como veinte minutos." } },
      { en: "How is the food?", es: "¿Cómo está la comida?", note: "At lunch!", response: { en: "It's delicious! Very tasty.", es: "¡Está deliciosa! Muy rica." } },
      { en: "How is work?", es: "¿Cómo va el trabajo?", note: "Chatting with colleagues", response: { en: "Busy but going well, thanks!", es: "¡Ocupado pero bien, gracias!" } },
      { en: "How was your day?", es: "¿Cómo te fue hoy?", note: "End of day chat", response: { en: "Really good! Very productive.", es: "¡Muy bien! Muy productivo." } },
      { en: "How can I help you?", es: "¿Cómo te puedo ayudar?", note: "Offering help", response: { en: "Could you explain this to me?", es: "¿Me puedes explicar esto?" } },
      { en: "How did it go?", es: "¿Cómo te fue?", note: "After an event, trip or meeting", response: { en: "It went really well, better than expected!", es: "¡Muy bien, mejor de lo esperado!" } },
      { en: "How do you feel?", es: "¿Cómo te sientes?", note: "Checking in on someone's wellbeing", response: { en: "A bit tired but fine, thank you.", es: "Un poco cansado/a pero bien, gracias." } },
      { en: "How do you know each other?", es: "¿Cómo se conocen?", note: "When meeting people together", response: { en: "We met at work about two years ago.", es: "Nos conocimos en el trabajo hace como dos años." } },
      { en: "How often do you come here?", es: "¿Cada cuánto vienes aquí?", note: "Chatting about habits and routines", response: { en: "Usually every weekend with the family.", es: "Normalmente cada fin de semana con la familia." } },
      { en: "How was the journey?", es: "¿Cómo estuvo el viaje?", note: "When someone arrives from far away", response: { en: "Long but fine! Good to be here.", es: "Largo pero bien. ¡Qué bueno estar aquí!" } },
    ],
  },
  {
    id: "when", label: "⏰ When", color: "purple",
    phrases: [
      { en: "When?", es: "¿Cuándo?", note: "Simple question", response: { en: "Tomorrow at ten.", es: "Mañana a las diez." } },
      { en: "When are you coming back?", es: "¿Cuándo regresas?", note: "Asking someone's return", response: { en: "I'll be back on Friday.", es: "Regreso el viernes." } },
      { en: "When do we eat?", es: "¿Cuándo comemos?", note: "Important question!", response: { en: "In about half an hour.", es: "En como media hora." } },
      { en: "When does it start?", es: "¿Cuándo empieza?", note: "Events / meetings", response: { en: "It starts at nine sharp.", es: "Empieza a las nueve en punto." } },
      { en: "Now / Right now", es: "Ahora. / Ahorita.", note: "'Ahorita' can mean now, soon, or later!", response: { en: "OK, I'm coming right now!", es: "¡Bueno, ya voy!" } },
      { en: "Later", es: "Después. / Luego.", note: "Both very common", response: { en: "OK, see you later then.", es: "Bueno, hasta luego entonces." } },
      { en: "Today / Tomorrow / Yesterday", es: "Hoy. / Mañana. / Ayer.", note: "Essential time words", response: { en: "Let's do it today if possible.", es: "Hagámoslo hoy si es posible." } },
      { en: "Always / Never", es: "Siempre. / Nunca.", note: "Emphasising habits", response: { en: "I know, you always say that!", es: "¡Ya sé, siempre dices eso!" } },
      { en: "When are you free?", es: "¿Cuándo estás libre?", note: "Making plans with someone", response: { en: "I'm free from Thursday onwards.", es: "Estoy libre desde el jueves." } },
      { en: "When did that happen?", es: "¿Cuándo pasó eso?", note: "Asking about a past event", response: { en: "It happened last week, quite a surprise!", es: "Pasó la semana pasada, ¡fue una sorpresa!" } },
      { en: "When do you finish work?", es: "¿A qué hora terminas de trabajar?", note: "Making after-work plans", response: { en: "I finish at six, why? Any plans?", es: "Termino a las seis, ¿por qué? ¿Hay planes?" } },
      { en: "Since when?", es: "¿Desde cuándo?", note: "Asking how long something has been the case", response: { en: "Since about three years ago.", es: "Desde hace como tres años." } },
      { en: "Until when?", es: "¿Hasta cuándo?", note: "Asking about an end point or deadline", response: { en: "Until the end of the month.", es: "Hasta finales del mes." } },
      { en: "What time do you want to meet?", es: "¿A qué hora quedamos?", note: "Arranging to meet up", response: { en: "How about one o'clock?", es: "¿Qué tal a la una?" } },
      { en: "Is it too late?", es: "¿Ya es muy tarde?", note: "Checking if you've missed something", response: { en: "No! You're just in time.", es: "¡No! Llegas justo a tiempo." } },
    ],
  },
  {
    id: "where", label: "📍 Where", color: "red",
    phrases: [
      { en: "Where are you?", es: "¿Dónde estás?", note: "Finding someone", response: { en: "I'm near the entrance, coming!", es: "Estoy cerca de la entrada, ¡ya voy!" } },
      { en: "Where are you going?", es: "¿A dónde vas?", note: "Very common casual question", response: { en: "To the canteen. Want to come?", es: "Al comedor. ¿Quieres venir?" } },
      { en: "Where do you live?", es: "¿Dónde vives?", note: "Getting to know someone", response: { en: "I live near the city centre.", es: "Vivo cerca del centro." } },
      { en: "Where do you work?", es: "¿Dónde trabajas?", note: "Chatting with colleagues", response: { en: "I work on the second floor.", es: "Trabajo en el segundo piso." } },
      { en: "Where is...?", es: "¿Dónde está...?", note: "Finding a place or person", response: { en: "It's just around the corner.", es: "Está justo a la vuelta." } },
      { en: "Here / There", es: "Aquí. / Allá.", note: "Point things out", response: { en: "Over there, next to the door.", es: "Allá, junto a la puerta." } },
      { en: "Near / Far", es: "Cerca. / Lejos.", note: "Describing distance", response: { en: "It's very close, about five minutes.", es: "Está muy cerca, como cinco minutos." } },
      { en: "I am going to...", es: "Voy a...", note: "Tell someone where you're going", response: { en: "OK! See you when you're back.", es: "¡Bueno! Te veo cuando regreses." } },
      { en: "I am at home", es: "Estoy en casa", note: "Common location phrase", response: { en: "Lucky you! I'm still at work.", es: "¡Qué suerte! Yo sigo en el trabajo." } },
      { en: "I am at work", es: "Estoy en el trabajo", note: "Telling someone where you are", response: { en: "Me too! See you soon.", es: "¡Yo también! Nos vemos pronto." } },
      { en: "Where did you grow up?", es: "¿Dónde creciste?", note: "Getting to know someone's background", response: { en: "I grew up in a small town in the south.", es: "Crecí en un pueblo pequeño en el sur." } },
      { en: "Where are we meeting?", es: "¿Dónde quedamos?", note: "Arranging a meeting point", response: { en: "How about the café on the corner?", es: "¿Qué tal el café de la esquina?" } },
      { en: "Where are you from originally?", es: "¿De dónde eres originalmente?", note: "Asking about someone's roots", response: { en: "Originally from Guadalajara, but I've lived here for years.", es: "De Guadalajara, pero llevo años aquí." } },
      { en: "Where is the nearest...?", es: "¿Dónde está el/la... más cercano/a?", note: "Finding local places — shops, pharmacy, etc.", response: { en: "Just two blocks that way, can't miss it.", es: "A dos cuadras por allá, no tiene pérdida." } },
      { en: "Where shall we eat?", es: "¿Dónde comemos?", note: "Deciding on a lunch or dinner spot", response: { en: "There's a great place nearby I'd like to try.", es: "Hay un buen lugar cerca que quiero probar." } },
    ],
  },
  {
    id: "cani", label: "🙋 Can I", color: "teal",
    phrases: [
      { en: "Can I help you?", es: "¿Te puedo ayudar?", note: "Offering your help", response: { en: "Yes please! I need a hand with this.", es: "¡Sí por favor! Necesito ayuda con esto." } },
      { en: "Can I have a coffee please?", es: "¿Me puede dar un café, por favor?", note: "Ordering at the cafe", response: { en: "Of course! Black or with milk?", es: "¡Claro! ¿Negro o con leche?" } },
      { en: "Can I sit here?", es: "¿Me puedo sentar aquí?", note: "In the break room or canteen", response: { en: "Yes of course, go ahead!", es: "¡Sí claro, adelante!" } },
      { en: "Can I ask you something?", es: "¿Te puedo preguntar algo?", note: "Polite way to start a question", response: { en: "Sure, go ahead!", es: "¡Claro, dime!" } },
      { en: "Can I borrow that?", es: "¿Me lo puedes prestar?", note: "Asking to borrow something", response: { en: "Yes, just bring it back later.", es: "Sí, solo devuélvelo después." } },
      { en: "Can I come with you?", es: "¿Puedo ir contigo?", note: "Joining someone", response: { en: "Of course, let's go together!", es: "¡Claro, vamos juntos!" } },
      { en: "Can I have the bill please?", es: "¿Me puede traer la cuenta, por favor?", note: "At a restaurant", response: { en: "Of course, one moment please.", es: "Claro, un momento por favor." } },
      { en: "Can I try that?", es: "¿Puedo probar eso?", note: "Tasting food or trying something", response: { en: "Yes! Tell me what you think.", es: "¡Sí! Dime qué te parece." } },
      { en: "Can I call you later?", es: "¿Te puedo llamar después?", note: "Arranging to speak later", response: { en: "Sure, I'll be free after three.", es: "Claro, estaré libre después de las tres." } },
      { en: "Can I use this?", es: "¿Puedo usar esto?", note: "Asking permission to use something", response: { en: "Yes go ahead, I don't need it.", es: "Sí adelante, yo no lo necesito." } },
      { en: "Can I go now?", es: "¿Ya me puedo ir?", note: "Casual — asking if it's ok to leave", response: { en: "Yes, see you tomorrow!", es: "Sí, ¡hasta mañana!" } },
      { en: "Can I speak with...?", es: "¿Puedo hablar con...?", note: "On the phone or in person", response: { en: "One moment, I'll get them.", es: "Un momento, ahora te lo paso." } },
      { en: "Can I pay by card?", es: "¿Puedo pagar con tarjeta?", note: "Useful when out!", response: { en: "Yes of course, the reader is here.", es: "Sí claro, aquí está la terminal." } },
      { en: "Can I leave a message?", es: "¿Puedo dejar un mensaje?", note: "When someone isn't available", response: { en: "Of course, I'll pass it on.", es: "Claro, yo se lo digo." } },
      { en: "Can I take a photo here?", es: "¿Puedo tomar una foto aquí?", note: "Asking permission before photographing", response: { en: "Yes of course, go ahead!", es: "¡Sí claro, adelante!" } },
    ],
  },
  {
    id: "smalltalk", label: "💬 Small Talk", color: "indigo",
    phrases: [
      { en: "Do you have family here?", es: "¿Tienes familia aquí?", note: "Family is huge in Latin culture", response: { en: "Yes, my brother lives nearby.", es: "Sí, mi hermano vive cerca." } },
      { en: "How many kids do you have?", es: "¿Cuántos hijos tienes?", note: "Very normal question in Latin culture", response: { en: "I have two, a boy and a girl.", es: "Tengo dos, un niño y una niña." } },
      { en: "What do you do at the weekend?", es: "¿Qué haces el fin de semana?", note: "Getting to know their life", response: { en: "I usually spend time with family.", es: "Normalmente paso tiempo con la familia." } },
      { en: "Do you like football?", es: "¿Te gusta el fútbol?", note: "Safe bet for bonding!", response: { en: "I love it! Do you have a team?", es: "¡Me encanta! ¿Tienes equipo?" } },
      { en: "What music do you like?", es: "¿Qué música te gusta?", note: "Great conversation starter", response: { en: "I love salsa and cumbia!", es: "¡Me encanta la salsa y la cumbia!" } },
      { en: "What food do you like?", es: "¿Qué comida te gusta?", note: "Always a winner", response: { en: "I love spicy food! And you?", es: "¡Me encanta la comida picante! ¿Y a ti?" } },
      { en: "I love your country's food", es: "Me encanta la comida de tu país", note: "They will love this!", response: { en: "Really? I'll bring you something homemade!", es: "¿En serio? ¡Te traigo algo hecho en casa!" } },
      { en: "How long have you been here?", es: "¿Cuánto tiempo llevas aquí?", note: "For someone who moved here", response: { en: "About three years already.", es: "Ya como tres años." } },
      { en: "Do you miss your home country?", es: "¿Extrañas tu país?", note: "Shows you care", response: { en: "Yes, especially the food and family.", es: "Sí, especialmente la comida y la familia." } },
      { en: "What's it like where you're from?", es: "¿Cómo es de donde eres?", note: "Invite them to share their story", response: { en: "It's beautiful! Very warm people.", es: "¡Es muy bonito! La gente es muy cálida." } },
      { en: "I would love to visit one day", es: "Me encantaría visitar algún día", note: "They'll appreciate this", response: { en: "You should! I'll recommend places!", es: "¡Deberías ir! ¡Te recomiendo lugares!" } },
      { en: "I am learning Spanish", es: "Estoy aprendiendo español", note: "Tell them your goal", response: { en: "Wow, your Spanish is already great!", es: "¡Wow, tu español ya está muy bien!" } },
      { en: "You are very kind", es: "Eres muy amable", note: "Warm compliment", response: { en: "Thank you, you too! Very sweet.", es: "¡Gracias, tú también! Muy amable." } },
      { en: "We should have lunch together", es: "Deberíamos comer juntos", note: "Building friendship", response: { en: "Yes! How about tomorrow?", es: "¡Sí! ¿Qué tal mañana?" } },
      { en: "It was great talking to you", es: "Fue un placer hablar contigo", note: "Warm way to end a chat", response: { en: "Likewise! Let's chat again soon.", es: "¡Igualmente! Hablamos pronto." } },
    ],
  },
  {
    id: "everyday", label: "☀️ Everyday", color: "yellow",
    phrases: [
      { en: "Thank you / Thank you very much", es: "Gracias. / Muchas gracias.", note: "Always appreciated", response: { en: "You're welcome, no problem!", es: "De nada, ¡no hay problema!" } },
      { en: "You're welcome", es: "De nada", note: "Reply to gracias", response: { en: "Thank you so much, you're very kind.", es: "Muchas gracias, eres muy amable." } },
      { en: "Please", es: "Por favor", note: "Always use this!", response: { en: "Of course, with pleasure!", es: "¡Claro, con mucho gusto!" } },
      { en: "Sorry / Excuse me", es: "Lo siento. / Perdón. / Disculpe.", note: "Disculpe for getting attention", response: { en: "No worries at all!", es: "¡No te preocupes para nada!" } },
      { en: "No problem!", es: "¡No hay problema! / ¡No te preocupes!", note: "Very Latin American vibe", response: { en: "Thank you for understanding!", es: "¡Gracias por entender!" } },
      { en: "I want a coffee please", es: "Quiero un café, por favor", note: "Lunchtime essential", response: { en: "Right away! Black or with milk?", es: "¡Ahorita! ¿Negro o con leche?" } },
      { en: "I want to eat", es: "Quiero comer", note: "Let them know you're hungry", response: { en: "Me too! What do you fancy?", es: "¡Yo también! ¿Qué se te antoja?" } },
      { en: "The food is very good", es: "La comida está muy buena", note: "Compliment the food", response: { en: "I'm glad you like it!", es: "¡Me alegra que te guste!" } },
      { en: "Cheers! / To your health!", es: "¡Salud!", note: "Also used when someone sneezes", response: { en: "Cheers! To good times!", es: "¡Salud! ¡Por los buenos momentos!" } },
      { en: "See you later!", es: "¡Hasta luego!", note: "Standard goodbye", response: { en: "See you! Take care!", es: "¡Hasta luego! ¡Cuídate!" } },
      { en: "See you tomorrow!", es: "¡Hasta mañana!", note: "End of the work day", response: { en: "See you tomorrow! Have a good evening.", es: "¡Hasta mañana! Que tengas buena tarde." } },
      { en: "Take care!", es: "¡Cuídate!", note: "Warm goodbye", response: { en: "You too! See you soon.", es: "¡Tú también! Nos vemos pronto." } },
      { en: "Have a good day!", es: "¡Que tengas un buen día!", note: "Friendly farewell", response: { en: "Thank you, you too!", es: "¡Gracias, igualmente!" } },
      { en: "With pleasure!", es: "¡Con mucho gusto!", note: "Enthusiastic way to say you're happy to help", response: { en: "Thank you so much, very kind!", es: "¡Muchas gracias, muy amable!" } },
      { en: "It doesn't matter / Never mind", es: "No importa. / No pasa nada.", note: "'No pasa nada' is very widely used", response: { en: "Are you sure? I'm sorry about that.", es: "¿Seguro? Lo siento mucho." } },
    ],
  },
  {
    id: "family", label: "👨‍👩‍👧 Family", color: "rose",
    phrases: [
      { en: "I've heard so much about you!", es: "¡He escuchado mucho sobre usted!", note: "Use 'usted' with older family members — very respectful", response: { en: "All good things I hope!", es: "¡Espero que todo bueno!" } },
      { en: "Thank you for having me in your home", es: "Gracias por recibirme en su casa", note: "This will go down really well — very respectful", response: { en: "You are always welcome here!", es: "¡Aquí siempre será bienvenido/a!" } },
      { en: "Your home is beautiful", es: "Su casa es muy bonita", note: "A lovely compliment on arrival", response: { en: "Thank you! Make yourself at home.", es: "¡Gracias! Estás en tu casa." } },
      { en: "It's so nice to finally meet you", es: "Qué gusto conocerle por fin", note: "Warm and genuine — they'll love it", response: { en: "Likewise! We've been looking forward to it.", es: "¡Igualmente! Teníamos muchas ganas de conocerte." } },
      { en: "Please correct my Spanish!", es: "¡Por favor corrija mi español!", note: "Shows humility — they will find it endearing", response: { en: "Your Spanish is already very good!", es: "¡Tu español ya está muy bien!" } },
      { en: "You have raised an amazing person", es: "Han criado a una persona increíble", note: "A beautiful compliment — say this to the parents", response: { en: "Thank you, that means a lot to us!", es: "¡Gracias, eso nos llena de orgullo!" } },
      { en: "This is delicious, did you make it?", es: "Está delicioso, ¿lo hizo usted?", note: "Always compliment the cook!", response: { en: "Yes! I'm so glad you like it.", es: "¡Sí! Me alegra mucho que te guste." } },
      { en: "Can I have the recipe?", es: "¿Me puede dar la receta?", note: "The highest compliment to a home cook", response: { en: "Of course! I'll write it down for you.", es: "¡Claro! Te la escribo." } },
      { en: "Can I help set the table?", es: "¿Puedo poner la mesa?", note: "Specific and helpful — shows initiative", response: { en: "How kind! Yes please, the plates are there.", es: "¡Qué amable! Sí, los platos están allá." } },
      { en: "How has your week been?", es: "¿Cómo estuvo tu semana?", note: "Perfect for regular visits", response: { en: "Busy but good! And yours?", es: "¡Ocupada pero bien! ¿Y la tuya?" } },
      { en: "How are the grandchildren?", es: "¿Cómo están los nietos?", note: "Grandparents will light up at this one!", response: { en: "Growing so fast! Come and see them.", es: "¡Creciendo muy rápido! Ven a verlos." } },
      { en: "What was [name] like as a child?", es: "¿Cómo era [nombre] de niño/a?", note: "Parents love this — prepare for funny stories!", response: { en: "Oh! Very cheeky and full of energy!", es: "¡Ay! Muy travieso/a y lleno/a de energía." } },
      { en: "What traditions does your family have?", es: "¿Qué tradiciones tiene tu familia?", note: "Shows real interest in their culture", response: { en: "We always gather at Christmas and eat together.", es: "Siempre nos reunimos en Navidad y comemos juntos." } },
      { en: "I feel very comfortable here", es: "Me siento muy cómodo/a aquí", note: "Use cómodo for male, cómoda for female", response: { en: "We're so glad! This is your home too.", es: "¡Nos alegra mucho! Esta también es tu casa." } },
      { en: "Your family is so warm and welcoming", es: "Su familia es muy cálida y acogedora", note: "A beautiful thing to say — means everything to them", response: { en: "And you are already part of the family!", es: "¡Y tú ya eres parte de la familia!" } },
    ],
  },
  {
    id: "numbers", label: "🔢 Numbers", color: "cyan",
    allowMore: true,
    phrases: [
      { en: "One", es: "Uno", note: "1 — uno (m) / una (f), e.g. una mesa, un café", response: { en: "One? Just one!", es: "¿Uno? ¡Solo uno!" } },
      { en: "Two", es: "Dos", note: "2 — same for masculine and feminine", response: { en: "Two please!", es: "¡Dos por favor!" } },
      { en: "Three", es: "Tres", note: "3", response: { en: "Three it is!", es: "¡Tres, perfecto!" } },
      { en: "Four", es: "Cuatro", note: "4", response: { en: "Four? Coming right up!", es: "¿Cuatro? ¡Ahorita!" } },
      { en: "Five", es: "Cinco", note: "5", response: { en: "Five minutes or five items?", es: "¿Cinco minutos o cinco cosas?" } },
      { en: "Six", es: "Seis", note: "6", response: { en: "Six o'clock works for me!", es: "¡Las seis me viene bien!" } },
      { en: "Seven", es: "Siete", note: "7", response: { en: "Seven is my lucky number!", es: "¡El siete es mi número de la suerte!" } },
      { en: "Eight", es: "Ocho", note: "8", response: { en: "Eight people? That's a big group!", es: "¿Ocho personas? ¡Qué grupo tan grande!" } },
      { en: "Nine", es: "Nueve", note: "9", response: { en: "Nine on the dot, don't be late!", es: "¡A las nueve en punto, no llegues tarde!" } },
      { en: "Ten", es: "Diez", note: "10", response: { en: "Ten out of ten!", es: "¡Diez de diez!" } },
      { en: "Twenty", es: "Veinte", note: "20 — e.g. veinte pesos, veinte minutos", response: { en: "Twenty minutes? I can wait.", es: "¿Veinte minutos? Puedo esperar." } },
      { en: "Thirty", es: "Treinta", note: "30 — e.g. treinta años (thirty years old)", response: { en: "About thirty sounds right.", es: "Como treinta suena bien." } },
      { en: "Forty", es: "Cuarenta", note: "40", response: { en: "Forty pesos, got it.", es: "Cuarenta pesos, entendido." } },
      { en: "Fifty", es: "Cincuenta", note: "50 — very common in prices", response: { en: "Fifty pesos? That's reasonable!", es: "¿Cincuenta pesos? ¡Está razonable!" } },
      { en: "Sixty", es: "Sesenta", note: "60", response: { en: "Sixty? Let me check I have enough.", es: "¿Sesenta? Déjame ver si traigo." } },
      { en: "Seventy", es: "Setenta", note: "70", response: { en: "Seventy is fine, here you go.", es: "Setenta está bien, aquí tiene." } },
      { en: "Eighty", es: "Ochenta", note: "80", response: { en: "Eighty pesos, no problem.", es: "Ochenta pesos, no hay problema." } },
      { en: "Ninety", es: "Noventa", note: "90", response: { en: "Ninety? Let me get change.", es: "¿Noventa? Déjame buscar cambio." } },
      { en: "One hundred", es: "Cien", note: "100 — cien = exactly 100, ciento = 100+, e.g. ciento diez", response: { en: "A hundred? That seems a lot!", es: "¿Cien? ¡Parece mucho!" } },
      { en: "How much? / How many?", es: "¿Cuánto? / ¿Cuántos?", note: "Essential for shopping — cuánto for price, cuántos for quantity", response: { en: "It costs twenty-five pesos.", es: "Cuesta veinticinco pesos." } },
      { en: "First / Second / Third", es: "Primero / Segundo / Tercero", note: "Ordinal numbers — great for directions and lists", response: { en: "Take the first left, then second right.", es: "La primera a la izquierda, luego la segunda a la derecha." } },
    ],
  },
  {
    id: "directions", label: "🗺️ Directions", color: "emerald",
    phrases: [
      { en: "Excuse me, where is...?", es: "Disculpe, ¿dónde está...?", note: "Always start with Disculpe — very polite", response: { en: "It's two blocks straight ahead.", es: "Está a dos cuadras recto." } },
      { en: "How do I get to...?", es: "¿Cómo llego a...?", note: "Great for asking for full directions", response: { en: "Go straight then turn left at the lights.", es: "Siga recto y gire a la izquierda en el semáforo." } },
      { en: "Turn left", es: "Gire a la izquierda", note: "Izquierda = left — tricky one to remember!", response: { en: "Left at the corner, you can't miss it.", es: "A la izquierda en la esquina, no tiene pérdida." } },
      { en: "Turn right", es: "Gire a la derecha", note: "Derecha = right", response: { en: "Right after the traffic lights.", es: "A la derecha después del semáforo." } },
      { en: "Go straight ahead", es: "Siga recto / Todo recto", note: "Recto = straight. Both are very common.", response: { en: "Yes, straight ahead for about two minutes.", es: "Sí, recto como dos minutos." } },
      { en: "At the traffic lights", es: "En el semáforo", note: "Very useful landmark in directions", response: { en: "Turn left at the traffic lights.", es: "Gire a la izquierda en el semáforo." } },
      { en: "At the corner", es: "En la esquina", note: "Esquina = corner — used all the time", response: { en: "It's right on the corner, you'll see it.", es: "Está justo en la esquina, lo vas a ver." } },
      { en: "It's on the left / right", es: "Está a la izquierda / derecha", note: "Telling someone which side something is on", response: { en: "Great, I can see it from here!", es: "¡Bien, ya lo veo desde aquí!" } },
      { en: "It's very close / far", es: "Está muy cerca / lejos", note: "So you know how far you need to go", response: { en: "Close! Just around the corner.", es: "¡Cerca! Justo a la vuelta." } },
      { en: "Two blocks / streets away", es: "A dos cuadras", note: "Cuadra = block — used across Latin America", response: { en: "Two blocks, then you'll see the sign.", es: "Dos cuadras y verás el letrero." } },
      { en: "Next to / Opposite / Behind", es: "Al lado de / Enfrente de / Detrás de", note: "Key words for describing location", response: { en: "It's opposite the pharmacy, can't miss it.", es: "Está enfrente de la farmacia, no tiene pérdida." } },
      { en: "I am lost", es: "Estoy perdido/a", note: "Use perdido (m) or perdida (f) for yourself", response: { en: "Don't worry! Where are you trying to go?", es: "¡No te preocupes! ¿A dónde quieres ir?" } },
      { en: "Can you show me on the map?", es: "¿Me puede mostrar en el mapa?", note: "Handy if you have your phone out", response: { en: "Of course! Look, we are here...", es: "¡Claro! Mira, estamos aquí..." } },
      { en: "Is it within walking distance?", es: "¿Se puede ir caminando?", note: "Caminar = to walk — great practical question", response: { en: "Yes, it's about ten minutes on foot.", es: "Sí, como diez minutos caminando." } },
      { en: "Thank you, you've been very helpful", es: "Gracias, ha sido de mucha ayuda", note: "A lovely way to thank someone for directions", response: { en: "You're welcome! Enjoy your visit!", es: "¡De nada! ¡Que disfrute su visita!" } },
    ],
  },
];

const colorMap = {
  orange: { bg: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", responseBg: "bg-orange-100", responseBorder: "border-orange-300" },
  green: { bg: "bg-green-500", light: "bg-green-50", border: "border-green-200", text: "text-green-700", responseBg: "bg-green-100", responseBorder: "border-green-300" },
  pink: { bg: "bg-pink-500", light: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", responseBg: "bg-pink-100", responseBorder: "border-pink-300" },
  blue: { bg: "bg-blue-500", light: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", responseBg: "bg-blue-100", responseBorder: "border-blue-300" },
  purple: { bg: "bg-purple-500", light: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", responseBg: "bg-purple-100", responseBorder: "border-purple-300" },
  red: { bg: "bg-red-500", light: "bg-red-50", border: "border-red-200", text: "text-red-700", responseBg: "bg-red-100", responseBorder: "border-red-300" },
  teal: { bg: "bg-teal-500", light: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", responseBg: "bg-teal-100", responseBorder: "border-teal-300" },
  indigo: { bg: "bg-indigo-500", light: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", responseBg: "bg-indigo-100", responseBorder: "border-indigo-300" },
  yellow: { bg: "bg-yellow-500", light: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", responseBg: "bg-yellow-100", responseBorder: "border-yellow-300" },
  rose: { bg: "bg-rose-500", light: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", responseBg: "bg-rose-100", responseBorder: "border-rose-300" },
  cyan: { bg: "bg-cyan-500", light: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", responseBg: "bg-cyan-100", responseBorder: "border-cyan-300" },
  emerald: { bg: "bg-emerald-500", light: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", responseBg: "bg-emerald-100", responseBorder: "border-emerald-300" },
};

function getBestVoice(voices) {
  const prefs = [
    v => /es-MX/i.test(v.lang), v => /es-US/i.test(v.lang), v => /es-419/i.test(v.lang),
    v => /es-CO/i.test(v.lang) || /es-AR/i.test(v.lang) || /es-CL/i.test(v.lang), v => /es/i.test(v.lang),
  ];
  for (const pref of prefs) { const m = voices.find(pref); if (m) return m; }
  return null;
}

export default function App() {
  const [activeSection, setActiveSection] = useState("starters");
  const [revealed, setRevealed] = useState({});
  const [speakingKey, setSpeakingKey] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const utterRef = useRef(null);

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices().filter(v => /es/i.test(v.lang));
      if (v.length) { setVoices(v); setSelectedVoice(prev => prev || getBestVoice(v)); }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  const section = sections.find(s => s.id === activeSection);
  const c = colorMap[section.color];

  const toggleReveal = (idx) => setRevealed(r => ({ ...r, [`${activeSection}-${idx}`]: !r[`${activeSection}-${idx}`] }));
  const revealAll = () => { const u = {}; section.phrases.forEach((_, i) => { u[`${activeSection}-${i}`] = true; }); setRevealed(r => ({ ...r, ...u })); };
  const hideAll = () => { const u = {}; section.phrases.forEach((_, i) => { u[`${activeSection}-${i}`] = false; }); setRevealed(r => ({ ...r, ...u })); };

  const speak = (e, text, key) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utter.voice = selectedVoice;
    utter.lang = selectedVoice?.lang || "es-MX";
    utter.rate = 0.82; utter.pitch = 1.05; utter.volume = 1;
    utter.onstart = () => setSpeakingKey(key);
    utter.onend = () => setSpeakingKey(null);
    utter.onerror = () => setSpeakingKey(null);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = (e) => { e.stopPropagation(); window.speechSynthesis.cancel(); setSpeakingKey(null); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">🇲🇽 Learn Spanish!</h1>
          <p className="text-center text-orange-100 text-sm mt-1">Latin American Spanish · Tap to reveal · 🔊 to hear it</p>
          <div className="mt-3 flex justify-center">
            <button onClick={() => setShowVoicePicker(v => !v)} className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all">
              🎙️ {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : "Select voice"} ▾
            </button>
          </div>
          {showVoicePicker && voices.length > 0 && (
            <div className="mt-2 mx-auto max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
              {voices.map((v, i) => (
                <button key={i} onClick={() => { setSelectedVoice(v); setShowVoicePicker(false); }}
                  className={`w-full text-left px-4 py-2 text-xs border-b border-gray-100 last:border-0 transition-colors ${selectedVoice?.name === v.name ? "bg-orange-50 text-orange-700 font-bold" : "text-gray-700 hover:bg-gray-50"}`}>
                  {v.name} <span className="text-gray-400">({v.lang})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex overflow-x-auto gap-2 p-3 bg-white shadow-sm">
          {sections.map(s => {
            const col = colorMap[s.color];
            return (
              <button key={s.id} onClick={() => { setActiveSection(s.id); setRevealed({}); }}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${activeSection === s.id ? `${col.bg} text-white border-transparent` : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 px-4 pt-4 pb-2 justify-between items-center">
          <div>
            <p className={`font-bold text-lg ${c.text}`}>{section.label}</p>
            <p className="text-xs text-gray-400">{section.phrases.length} {section.allowMore ? "cards" : "phrases"} · tap to reveal</p>
          </div>
          <div className="flex gap-2">
            <button onClick={hideAll} className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">Hide all</button>
            <button onClick={revealAll} className={`text-xs px-3 py-1.5 rounded-full ${c.bg} text-white hover:opacity-90`}>Reveal all</button>
          </div>
        </div>

        <div className="px-4 pb-8 flex flex-col gap-3">
          {section.phrases.map((p, i) => {
            const key = `${activeSection}-${i}`;
            const isOpen = revealed[key];
            const phraseKey = `${key}-phrase`;
            const responseKey = `${key}-response`;
            const isSpeakingPhrase = speakingKey === phraseKey;
            const isSpeakingResponse = speakingKey === responseKey;
            return (
              <div key={i} onClick={() => toggleReveal(i)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${isOpen ? `${c.light} ${c.border}` : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{p.en}</p>
                    {isOpen && (
                      <div className="mt-2">
                        <p className={`text-xl font-bold ${c.text} mb-2`}>{p.es}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <button onClick={isSpeakingPhrase ? stopSpeaking : (e) => speak(e, p.es, phraseKey)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isSpeakingPhrase ? "bg-gray-700 text-white animate-pulse" : `${c.bg} text-white hover:opacity-80`}`}>
                            {isSpeakingPhrase ? "⏹ Stop" : "🔊 Listen"}
                          </button>
                          {isSpeakingPhrase && <span className="text-xs text-gray-400 italic">Playing...</span>}
                        </div>
                        <p className="text-xs text-gray-500 mb-3 italic">💡 {p.note}</p>
                        <div onClick={e => e.stopPropagation()} className={`rounded-lg border p-3 ${c.responseBg} ${c.responseBorder}`}>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">💬 They might reply...</p>
                          <p className="text-xs text-gray-600 mb-1">{p.response.en}</p>
                          <p className={`text-base font-bold ${c.text} mb-2`}>{p.response.es}</p>
                          <button onClick={isSpeakingResponse ? stopSpeaking : (e) => speak(e, p.response.es, responseKey)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isSpeakingResponse ? "bg-gray-700 text-white animate-pulse" : `${c.bg} text-white hover:opacity-80`}`}>
                            {isSpeakingResponse ? "⏹ Stop" : "🔊 Listen"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-gray-300 text-lg mt-0.5">{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pb-6 px-4">
          <p className="text-xs text-gray-400">💬 Start with <strong>¡Hola! ¿Cómo estás?</strong> — your colleagues will love it!</p>
        </div>
      </div>
    </div>
  );
}