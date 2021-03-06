
SELECT 
     TR_Key 
    ,TR_Value 
FROM T_Translations 
WHERE TR_Key LIKE 'default_issue_status_%'

ORDER BY TR_Value 


-- TR_Key                             TR_Value
-- default_issue_status_closed        Closed
-- default_issue_status_feedback      Feedback
-- default_issue_status_in_progress   In Progress
-- default_issue_status_new           New
-- default_issue_status_rejected      Rejected
-- default_issue_status_resolved      Resolved


-- TR_Key                             TR_Value
-- default_issue_status_new           Neu
-- default_issue_status_rejected      Abgewiesen
-- default_issue_status_in_progress   In Bearbeitung
-- default_issue_status_feedback      Feedback
-- default_issue_status_resolved      Gelöst
-- default_issue_status_closed        Erledigt





CREATE TABLE dbo.stati
(
    id int NULL 
   ,text national character varying(255) NULL
   ,name national character varying(255) NULL 
   ,sort int null 
);
-- ALTER TABLE stati ADD sort int null
-- ALTER TABLE stati ADD is_default null CONSTRAINT DF_is_default DEFAULT (0)



INSERT INTO stati
( 
     [id]
    ,[text]
    ,[name]
)
      SELECT 1 AS val, 'default_issue_status_closed' AS statusName, 'Closed' AS statusText 
UNION SELECT 2 AS val, 'default_issue_status_feedback', 'Feedback' 
UNION SELECT 3 AS val, 'default_issue_status_in_progress', 'In Progress' 
UNION SELECT 4 AS val, 'default_issue_status_new', 'New' 
UNION SELECT 5 AS val, 'default_issue_status_rejected', 'Rejected' 
UNION SELECT 6 AS val, 'default_issue_status_resolved', 'Resolved' 



      SELECT 1 AS val, 'default_issue_status_new' AS statusName, 'Neu' AS statusText 
UNION SELECT 2 AS val, 'default_issue_status_rejected', 'Abgewiesen' 
UNION SELECT 3 AS val, 'default_issue_status_in_progress', 'In Bearbeitung' 
UNION SELECT 4 AS val, 'default_issue_status_feedback', 'Feedback' 
UNION SELECT 5 AS val, 'default_issue_status_resolved', 'Gelöst' 
UNION SELECT 6 AS val, 'default_issue_status_closed', 'Erledigt' 







SELECT 
     TR_Key 
    ,TR_Value 
FROM T_Translations 
WHERE TR_Key LIKE 'default_priority_%'

ORDER BY TR_Value 



-- default_priority_high	High
-- default_priority_immediate	Immediate
-- default_priority_low	Low
-- default_priority_normal	Normal
-- default_priority_urgent	Urgent





-- default_priority_low	Niedrig
-- default_priority_normal	Normal
-- default_priority_urgent	Dringend
-- default_priority_high	Hoch
-- default_priority_immediate	Sofort






CREATE TABLE dbo.priorities
(
    id int NULL 
   ,text national character varying(255) NULL
   ,name national character varying(255) NULL 
   ,sort int null 
);
-- ALTER TABLE priorities ADD sort int null




INSERT INTO priorities
( 
     [id]
    ,[text]
    ,[name]
)
  
 
      SELECT 1 AS val, 'default_priority_low', 'Low' 
UNION SELECT 2 AS val, 'default_priority_normal', 'Normal' 
UNION SELECT 3 AS val, 'default_priority_urgent', 'Urgent' 
UNION SELECT 4 AS val, 'default_priority_high' AS prio, 'High' AS txt
UNION SELECT 5 AS val, 'default_priority_immediate', 'Immediate'



      SELECT 1 AS val, 'default_priority_low', 'Niedrig' 
UNION SELECT 2 AS val, 'default_priority_normal', 'Normal' 
UNION SELECT 3 AS val, 'default_priority_urgent', 'Dringend' 
UNION SELECT 4 AS val, 'default_priority_high', 'Hoch' 
UNION SELECT 5 AS val, 'default_priority_immediate', 'Sofort' 

