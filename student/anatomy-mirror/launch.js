(() => {
 'use strict';
 const target='https://anatomy-mirror-students.takwing-yu.workers.dev';
 const auth=window.PhysioSkillsAuth,button=document.querySelector('[data-anatomy-open]'),status=document.querySelector('[data-anatomy-status]');
 async function ready(){try{await auth.requireStudentSession();status.textContent='Student session verified. Open the private viewer to continue.';button.disabled=false;}catch(e){status.textContent=e?.message||'Please log in through the Skills Lab.';}}
 button.addEventListener('click',async()=>{
  button.disabled=true;status.textContent='Opening your private viewer…';
  try {
   // Check again at click time; tokens never appear in a URL, history or referrer.
   await auth.requireStudentSession();const token=auth.getToken();if(!token)throw Error('Please log in again.');
   const form=document.createElement('form');form.method='POST';form.action=target+'/session';form.hidden=true;
   const input=document.createElement('input');input.type='hidden';input.name='session_token';input.value=token;form.append(input);document.body.append(form);form.submit();input.value='';form.remove();
  }catch(e){status.textContent=e?.message||'The private viewer could not be opened.';button.disabled=false;}
 });
 void ready();
})();
