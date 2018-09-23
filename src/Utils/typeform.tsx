import * as React from 'react';

export const typeformButton = (formUrl: string) => `<a class="typeform-share button" href="${formUrl}" data-mode="popup" target="_blank">Remplir le formulaire d'adhésion</a> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>`;

export const HappyTechTypeForm = (formId: string) => <div className="flexCenter" dangerouslySetInnerHTML={{ __html: typeformButton(`https://happytech.typeform.com/to/${formId}`) }} />