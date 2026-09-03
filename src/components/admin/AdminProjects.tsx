import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjects, updateProjectStatus, createProjectTask, updateProjectTaskStatus, fetchProjectActivity } from '../../services/clientProjectService';
import type { ProjectEntity, ProjectStatus, ProjectTaskEntity, ProjectActivityEntity } from '../../types/lead';
import { PROJECT_STATUS_LABELS } from '../../types/lead';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  RefreshCw,
  X,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalProjects, setTotalProjects] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalContractedValue, setTotalContractedValue] = useState(0);

  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(null);
  const [activities, setActivities] = useState<ProjectActivityEntity[]>([]);

  // Task creation state in drawer
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const newTaskEngineer = '@lead_engineer';

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProjects();
      setProjects(res.projects);
      setTotalProjects(res.totalProjects);
      setInProgressCount(res.inProgressCount);
      setCompletedCount(res.completedCount);
      setTotalContractedValue(res.totalContractedValue);
    } catch (err) {
      console.error('Error cargando proyectos:', err);
      setError('No se pudieron consultar los proyectos desde Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProjects();
        if (isMounted) {
          setProjects(res.projects);
          setTotalProjects(res.totalProjects);
          setInProgressCount(res.inProgressCount);
          setCompletedCount(res.completedCount);
          setTotalContractedValue(res.totalContractedValue);
        }
      } catch (err) {
        console.error('Error cargando proyectos:', err);
        if (isMounted) setError('No se pudieron consultar proyectos.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void init();
    return () => { isMounted = false; };
  }, []);

  const handleOpenProjectDrawer = async (project: ProjectEntity) => {
    setSelectedProject(project);
    const activityList = await fetchProjectActivity(project.id);
    setActivities(activityList);
  };

  const handleStatusChange = async (project: ProjectEntity, newStatus: ProjectStatus) => {
    const newPercentage = newStatus === 'completed' ? 100 : project.completion_percentage;
    const updated = await updateProjectStatus(project.id, newStatus, newPercentage);
    if (updated) {
      loadProjects();
      if (selectedProject?.id === project.id) {
        setSelectedProject(updated);
      }
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newTaskTitle.trim()) return;

    await createProjectTask(selectedProject.id, {
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || null,
      assigned_to: newTaskEngineer.trim() || '@lead_engineer',
      status: 'pending',
      priority: 'high'
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    loadProjects();
    handleOpenProjectDrawer(selectedProject);
  };

  const handleToggleTask = async (task: ProjectTaskEntity) => {
    if (!selectedProject) return;
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateProjectTaskStatus(task.id, selectedProject.id, nextStatus);
    loadProjects();
    handleOpenProjectDrawer(selectedProject);
  };

  return (
    <div className="space-y-6 font-tech">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Control de Proyectos de Ingeniería
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fase 4: Ejecución, avance (%), tareas técnicas y entregables acordados ({totalProjects} registrados)
          </p>
        </div>

        <button
          onClick={loadProjects}
          className="p-2.5 rounded-xl bg-[#142332] hover:bg-[#2b5b84] text-slate-300 hover:text-white border border-[#2b5b84] transition-all cursor-pointer shadow-sm self-start sm:self-auto flex items-center gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualizar Proyectos</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Valor Contratado */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">VALOR CONTRATADO</span>
            <div className="p-2 rounded-xl bg-[#142332] text-[#ffd343]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#ffd343]">
              ${totalContractedValue.toLocaleString('es-CO')}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Monto total acordado ($ COP)</span>
          </div>
        </div>

        {/* En Ejecución */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">EN EJECUCIÓN</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300">{inProgressCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Proyectos activos</span>
          </div>
        </div>

        {/* Entregados */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">ENTREGADOS</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{completedCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Proyectos finalizados</span>
          </div>
        </div>

        {/* Total Proyectos */}
        <div className="p-5 rounded-2xl bg-[#1b3852] border border-[#2b5b84] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-400 font-bold">TOTAL PROYECTOS</span>
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalProjects}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Proyectos registrados</span>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="bg-[#1b3852] rounded-3xl border border-[#2b5b84] shadow-xl overflow-hidden">
        
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ffd343] animate-spin" />
            <span className="text-xs font-mono-tech text-slate-300">Cargando proyectos desde Supabase...</span>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-rose-300 text-xs space-y-3 p-6">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-slate-300 text-xs space-y-3 p-6 max-w-lg mx-auto">
            <FolderGit2 className="w-10 h-10 text-[#ffd343] mx-auto mb-2" />
            <p className="font-bold text-white text-base">No hay proyectos en ejecución aún</p>
            <p className="text-slate-400 leading-relaxed">
              Los proyectos se crean automáticamente al convertir una cotización aceptada o un lead ganado mediante la acción <strong>"Convertir en Cliente & Proyecto"</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              
              <thead className="bg-[#142332] text-[11px] font-mono-tech text-slate-400 border-b border-[#2b5b84] uppercase">
                <tr>
                  <th className="py-4 px-6 font-bold">Código / Proyecto</th>
                  <th className="py-4 px-6 font-bold">Cliente / Empresa</th>
                  <th className="py-4 px-6 font-bold">Estado</th>
                  <th className="py-4 px-6 font-bold">Avance (%)</th>
                  <th className="py-4 px-6 font-bold">Responsable</th>
                  <th className="py-4 px-6 font-bold">Valor Contratado</th>
                  <th className="py-4 px-6 font-bold text-right">Acción</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2b5b84]/50">
                {projects.map((project) => {
                  const statusMeta = PROJECT_STATUS_LABELS[project.status] || PROJECT_STATUS_LABELS.planning;

                  return (
                    <tr key={project.id} className="hover:bg-[#142332]/60 transition-colors group">
                      
                      <td className="py-4 px-6 font-mono-tech">
                        <span className="font-extrabold text-[#ffd343] text-sm block">
                          {project.project_code}
                        </span>
                        <span className="text-white font-bold text-xs block truncate max-w-xs">
                          {project.name}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-white group-hover:text-[#ffd343] transition-colors">
                          {project.client?.company_name || 'Cliente Corplex'}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border inline-block ${statusMeta.bgClass} ${statusMeta.textClass}`}>
                          {statusMeta.label}
                        </span>
                      </td>

                      {/* Completion Progress Bar */}
                      <td className="py-4 px-6 w-44">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-mono-tech">
                            <span className="font-bold text-white">{project.completion_percentage}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#142332] overflow-hidden border border-[#2b5b84]">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-500"
                              style={{ width: `${project.completion_percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono-tech text-slate-300">
                        {project.assigned_lead_engineer || <span className="text-slate-500 italic">Sin asignar</span>}
                      </td>

                      <td className="py-4 px-6 font-mono-tech font-extrabold text-[#ffd343] text-sm">
                        ${Number(project.contract_value).toLocaleString('es-CO')}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleOpenProjectDrawer(project)}
                          className="px-3 py-1.5 rounded-xl bg-[#142332] hover:bg-[#ffd343] hover:text-[#111d28] text-slate-300 font-bold border border-[#2b5b84] transition-all cursor-pointer"
                        >
                          Gestionar Tareas
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Project Management Side Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-tech">
          <div className="w-full max-w-2xl bg-[#1b3852] border-l border-[#2b5b84] h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100">
            
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-[#2b5b84] pb-4">
              <div>
                <span className="text-xs font-mono-tech text-[#ffd343] font-bold">
                  {selectedProject.project_code} • {selectedProject.client?.company_name || 'Cliente'}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedProject.name}
                </h2>
                <div className="text-xs text-slate-300 mt-1">
                  Valor Contratado Acordado: <strong className="text-[#ffd343] font-mono-tech">${Number(selectedProject.contract_value).toLocaleString('es-CO')} COP</strong>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-[#142332] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Progress Control Box */}
            <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech text-slate-400 font-bold uppercase">Estado & Avance (%)</span>
                <span className="text-sm font-mono-tech font-extrabold text-[#ffd343]">
                  {selectedProject.completion_percentage}% Completado
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['planning', 'in_progress', 'review', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedProject, st as ProjectStatus)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedProject.status === st
                        ? 'bg-[#ffd343] text-[#111d28] border-[#ffd343] font-extrabold shadow'
                        : 'bg-[#1b3852] text-slate-300 border-[#2b5b84] hover:border-slate-400'
                    }`}
                  >
                    {PROJECT_STATUS_LABELS[st as ProjectStatus]?.label || st}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Tasks Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono-tech text-[#ffd343] uppercase font-bold tracking-wider flex items-center justify-between">
                <span>Tareas Técnicas & Entregables ({selectedProject.tasks?.length || 0})</span>
              </h3>

              {/* Add New Task Form */}
              <form onSubmit={handleCreateTask} className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-3">
                <span className="text-[11px] text-slate-300 font-bold block">Agregar Entregable / Tarea Técnica:</span>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="Título de la tarea o entregable..."
                  className="w-full px-3 py-2 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTaskDesc}
                    onChange={e => setNewTaskDesc(e.target.value)}
                    placeholder="Descripción o alcance..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-[#1b3852] border border-[#2b5b84] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd343]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#ffd343] text-[#111d28] font-bold text-xs cursor-pointer shadow"
                  >
                    Agregar Tarea
                  </button>
                </div>
              </form>

              {/* Tasks List */}
              <div className="space-y-2">
                {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                  selectedProject.tasks.map(task => {
                    const isDone = task.status === 'completed';
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isDone
                            ? 'bg-[#142332]/40 border-[#2b5b84]/40 opacity-70'
                            : 'bg-[#142332] border-[#2b5b84] hover:border-[#ffd343]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <div>
                            <span className={`font-bold text-xs ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                              {task.title}
                            </span>
                            {task.description && (
                              <p className="text-[11px] text-slate-400 italic">{task.description}</p>
                            )}
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold ${
                          isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {isDone ? 'COMPLETADA' : 'PENDIENTE'}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-4">No hay tareas agregadas a este proyecto.</p>
                )}
              </div>
            </div>

            {/* Activity History */}
            {activities.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#142332] border border-[#2b5b84] space-y-2">
                <span className="text-xs font-mono-tech text-slate-400 uppercase font-bold block">Bitácora del Proyecto</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {activities.map(act => (
                    <div key={act.id} className="p-2 rounded-lg bg-[#1b3852] text-[11px] flex justify-between gap-2 border border-[#2b5b84]/40">
                      <span className="text-slate-200">{act.action}</span>
                      <span className="text-slate-400 font-mono-tech shrink-0">
                        {new Date(act.created_at).toLocaleDateString('es-CO')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
