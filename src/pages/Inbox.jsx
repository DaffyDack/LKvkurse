import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import InboxSidebar from '../partials/inbox/InboxSidebar';
import InboxBody from '../partials/inbox/InboxBody';

function Inbox() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inboxSidebarOpen, setInboxSidebarOpen] = useState(false);

  

  return (
    <>
      <div className="flex h-[100dvh] overflow-hidden">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="grow">
            <div className="relative flex h-full">

        
              <InboxSidebar inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

        
              <InboxBody inboxSidebarOpen={inboxSidebarOpen} setInboxSidebarOpen={setInboxSidebarOpen} />

            </div>
          </main>

        </div>

      </div>

    </>
  );
}

export default Inbox;