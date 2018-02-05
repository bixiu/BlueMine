﻿
using System.Collections.Generic;


namespace BlueMine.Models.Project
{
    // Definitely not like this: https://martinsdevblog.blogspot.ch/2013/05/how-to-display-recursive-tree-structure.html
    // or this https://stackoverflow.com/questions/6422895/asp-net-mvc-3-razor-recursive-function 
    // Instead, use DisplayTemplates
    public class ProjectRecursor
    {
        public Db.T_projects Me;
        protected List<Db.T_projects> m_list;
        
        
        public ProjectRecursor(Db.T_projects me, List<Db.T_projects> list)
        {
            Me = me;
            m_list = list;
        }
        
        
        private static int ProjectSorter(ProjectRecursor previous, ProjectRecursor next)
        {
            return System.StringComparer.InvariantCultureIgnoreCase
                .Compare(previous.Me.name, next.Me.name);
        }
        
        
        public List<ProjectRecursor> RootNodes
        {
            get
            {
                List<ProjectRecursor> ls = new List<ProjectRecursor>();

                for (int i = 0; i < this.m_list.Count; ++i)
                {
                    if (!this.m_list[i].parent_id.HasValue)
                        ls.Add(new ProjectRecursor(this.m_list[i], this.m_list));
                }

                ls.Sort(ProjectSorter);

                return ls;
            }
        }
        
        
        public List<ProjectRecursor> ChildNodes
        {
            get
            {
                if (this.Me == null)
                    return null;

                List<ProjectRecursor> ls = new List<ProjectRecursor>();
                for (int i = 0; i < this.m_list.Count; ++i)
                {
                    if (this.m_list[i].parent_id == this.Me.id)
                        ls.Add(new ProjectRecursor(this.m_list[i], this.m_list));
                }
                
                ls.Sort(ProjectSorter);
                
                return ls;
            }
        }
    }
    
    
}
